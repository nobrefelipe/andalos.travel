<template>

    <section class="create-itinerary">

        <a-icon  v-if="!itinerary" class="loading" type="loading" style="font-size: 50px; position: absolute; left:50%; top:50%;"/>


        <h2 v-if="itinerary" >Editing itinerary : {{ itinerary.title }}</h2>



        <div class="is-flexy is-full">

            <section class="container">
                <div class="quill-editor"
                     v-model="content"
                     v-quill:myQuillEditor="editorOption">
                </div>
            </section>

        </div>

        <a-form v-if="itinerary" :form="form">

            <!-- TITLE -->
            <a-form-item>

                <a-input v-decorator="[
                          'title',
                          {rules: [{ required: true }]}
                         ]"
                         :placeholder="itinerary.title"
                         @blur="generateSlug($event.target.value)"
                         addonBefore="Title"
                         size="large"/>

            </a-form-item>


            <!--COVER IMAGE-->
            <a-form-item>

                <div class="cover-image-wrapper">

                    <div class="cover-preview">

                        <img v-if="coverImageSecret && !uploadingProgress" :src="`https://images.graph.cool/v1/${API_SECRET}/${coverImageSecret}/100x`" >

                        <img v-if="previewImage && !uploadingProgress" :src="previewImage" >

                        <a-progress v-if="uploadingProgress" type="circle" :width="50" :percent="uploadingProgress"/>

                        <a-button v-if="coverImageSecret"  @click="showDeleteConfirm" type="dashed">DELETE</a-button>


                    </div>
                    <!--<img :src="previewImage" alt="" width="100px">-->
                    <input type="file" ref="myFiles" @change="onFileChange">

                </div>

            </a-form-item>

            <!--LOCATION-->
            <a-form-item>

                <location-autocomplete :countryObj="location"/>

            </a-form-item>

            <!--DATE-->
            <a-form-item>

                <a-range-picker v-decorator="[
                         'startEndDate',
                          {rules: [{ required: true }]}
                         ]"
                                format="DD/MM/YYYY"
                                @change="onSelectDate" size="large"/>

            </a-form-item>

            <!--BUDGET-->
            <a-form-item>

                <a-select v-decorator="[
                          'budget',
                          {rules: [{ required: true}]}
                         ]" style="width: 200px" @change="onSelectBudget" size="large">

                    <a-select-option value="up to $500">Up to $500</a-select-option>
                    <a-select-option value="$500-$1000">$500 to $1000</a-select-option>
                    <a-select-option value="$1000-$1500">$1000 to $1500</a-select-option>
                    <a-select-option value="+ $1500">$1500 +</a-select-option>
                </a-select>

            </a-form-item>

            <!--STYLE-->
            <a-form-item>

                <a-select v-decorator="[
                          'style',
                          {rules: [{ required: true}]}
                         ]" style="width: 200px" @change="onSelectStyle" size="large">

                    <a-select-option value="Backpacking">Backpacking</a-select-option>
                    <a-select-option value="Luxury">Luxury</a-select-option>
                    <a-select-option value="Adventure">Adventure</a-select-option>
                    <a-select-option value="Romantic">Romantic</a-select-option>
                    <a-select-option value="City Break">City Break</a-select-option>
                    <a-select-option value="Explore">Explore</a-select-option>
                    <a-select-option value="Family">Family</a-select-option>
                </a-select>



            </a-form-item>

            <!--LEVEL-->
            <a-form-item>

                <a-select v-decorator="[
                          'difficultyLevel',
                          {rules: [{ required: true}]}
                         ]" style="width: 200px" @change="onSelectLevel" size="large">

                    <a-select-option value="Easy">Easy</a-select-option>
                    <a-select-option value="Medium">Medium</a-select-option>
                    <a-select-option value="Hard">Hard</a-select-option>
                    <a-select-option value="Pro">Pro</a-select-option>

                </a-select>


            </a-form-item>

            <!--PUBLISH-->
            <a-form-item>

                Publish
                <a-switch defaultChecked @change='onCheckPublish'/>

            </a-form-item>

            <!--STAGES-->
            <a-form-item>

                <stages/>

            </a-form-item>


            <div class="action-bar">

                <a-button type="primary" html-type="submit" size="large" :loading="loading" @click="saveItinerary(uploadCoverImage)">
                    <span>{{saveButtonValue}}</span>
                </a-button>

            </div>


        </a-form>

    </section>

</template>

<script>

    import axios from 'axios';

    import moment from 'moment';

    import client from '@/server/client';

    import Stages from "./stages/index";

    import { GET_ITINERARY_BY_ID, updateItinerary , DELETE_COVER_IMAGE} from "@/server/queries/itinerary-queries";

    import string_to_slug from "@/plugins/string-to-slug";

    import LocationAutocomplete from "@/components/_dashboard/location-autocomplete";

    export default {


        name: "index",

        layout: "dashboard",

        components: { Stages, LocationAutocomplete },


        data(){

            return{

                content: "",

                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                    }
                },

                API_SECRET: 'cjtmzncsi0n4a01674y8tv1u1',

                itinerary: null,

                form: this.$form.createForm(this),

                slug: '',

                style: "Style",

                difficulty: "Difficulty",

                location: null,

                budget: 'Budget',

                coverImageID: '',

                coverImageSecret: '',

                previewImage: null,

                startDate: "",

                endDate: "",

                loading: false,

                isPublished: false,

                uploadingProgress: 0,

                saveButtonValue: "SAVE"

            }

        },


        mounted(){


            const ITINERARY_ID = this.$route.params.itineraryID;

            client.request(GET_ITINERARY_BY_ID, {id: ITINERARY_ID}).then( res => {

                // Set Initial Values
                this.form.getFieldDecorator('title', { initialValue: res.Itinerary.title });
                // this.form.getFieldDecorator('slug', { initialValue: res.Itinerary.slug });
                // this.form.getFieldDecorator('description', { initialValue: res.Itinerary.description });
                this.form.getFieldDecorator('style', { initialValue: res.Itinerary.style || 'Style'});
                this.form.getFieldDecorator('difficultyLevel', { initialValue: res.Itinerary.dificultyLevel || 'Difficulty' });
                this.form.getFieldDecorator('budget', { initialValue: res.Itinerary.budget || 'Budget' });
                this.form.getFieldDecorator('startEndDate', { initialValue: [moment(res.Itinerary.startDate || '20/04/2019', 'DD/MM/YYYY'), moment(res.Itinerary.endDate || '20/05/2019', 'DD/MM/YYYY')] });

                this.startDate = res.Itinerary.startDate || '20/04/2019';
                this.endDate = res.Itinerary.endDate || '20/05/2019';
                this.style = res.Itinerary.style;
                this.difficulty = res.Itinerary.dificultyLevel;
                this.budget = res.Itinerary.budget;
                this.coverImageID = res.Itinerary.coverImageId || "";
                this.coverImageSecret = res.Itinerary.coverImageSecret || "";
                this.slug = res.Itinerary.slug || "";
                this.location = JSON.parse(res.Itinerary.location);

                this.itinerary = res.Itinerary

                this.content = res.Itinerary.description


            } );

            /**
            *
            *   Location Autocomplete Listener
            *   listen to <location-autocomplete> component to emit event when user inputs location
             *
            *   @returns {location}
            *
            */
            this.$root.$on("location-autocomplete", location => {

                console.log(location)
                this.location = location;

            });

        },


        methods:{

            moment,

            onSelectStyle(value){

                this.style = value

            },

            onSelectLevel(value){

                this.difficulty = value

            },

            onSelectBudget(value){

                this.budget = value

            },

            onCheckPublish(checked){

                this.isPublished = checked

            },

            onSelectDate(date, dateString) {

                this.startDate = dateString[0];
                this.endDate = dateString[1];

            },

            updateItinerary(variables){

                this.loading = true;

                this.saveButtonValue = "SAVING ITINERARY";

                client.request(updateItinerary, variables)

                    .then( res => {

                        this.loading = false;

                        this.$message.success('SAVED');

                        this.saveButtonValue = "SAVE";

                    }).catch( error => {

                        console.log(error)

                        this.loading = false;

                        this.saveButtonValue = "SAVE";

                        this.$message.error('Something went wrong saving the itinerary');

                    });

            },

            async saveItinerary(fn) {

                // FN WILL BE A FUNCTION WE WANNA CALL BEFORE UPDATING THE ITINERARY
                fn ? await fn() : false;

                this.form.validateFields((err, values) => {

                    if (!err) {


                        console.log(this.content)
                        values.startDate = this.startDate;
                        values.endDate = this.endDate;

                        values.description = this.content;
                        values.id = this.$route.params.itineraryID;
                        values.designerId = this.$route.params.user;
                        values.published = this.isPublished;
                        values.slug = this.slug;
                        values.style = this.style;
                        values.dificultyLevel = this.difficulty;
                        values.budget = this.budget;
                        values.coverImageId = this.coverImageID;
                        values.coverImageSecret = this.coverImageSecret;
                        values.location = JSON.stringify(this.location);

                        this.updateItinerary(values)

                    }

                });
            },

            async uploadCoverImage() {

                let files = this.$refs.myFiles.files;

                let data = new FormData();

                this.uploadingProgress = 0;

                let vm = this;

                if (files[0]) {

                    this.loading = true;

                    this.saveButtonValue = "UPLOADING IMAGE"

                    data.append('data', files[0]);

                    await axios.request({

                        method: "post",

                        url: `https://api.graph.cool/file/v1/${this.API_SECRET}`,

                        data: data,

                        onUploadProgress: (p) => {

                            vm.uploadingProgress = Math.round((p.loaded / p.total) * 100)

                        }

                    }).then(data => {

                        this.coverImageSecret = data.data.secret;

                        this.coverImageID = data.data.id;

                        this.uploadingProgress = 0;

                    })

                }


            },

            deleteCoverImage(){

                // FIRST WE DELETE THE IMAGE FROM THE DATABASE
                client.request(DELETE_COVER_IMAGE, { coverId: this.coverImageID })

                    .then( res => {

                        console.log("delete cover image", res);

                        this.coverImageID = "";
                        this.coverImageSecret = "";

                        // THEN UPDATE THE ITINERARY
                        this.saveItinerary()


                    }).catch( error => {

                        console.log(error)

                        this.$message.error('Something went wrong deleting the image');

                    });

            },

            showDeleteConfirm() {

                let vm = this;

                this.$confirm({
                    title: 'DELETE COVER IMAGE?',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',

                    onOk() {

                        console.log('OK');

                        vm.deleteCoverImage();

                    }
                });

            },

            onFileChange(){

                let vm = this;

                let files = this.$refs.myFiles.files;

                if (files && files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {

                        vm.previewImage = e.target.result

                    }

                    reader.readAsDataURL(files[0]);
                }

            },

            generateSlug(str){

                this.slug = this.string_to_slug(str);

            }

        }

    }

</script>


<style scoped lang="scss">


    .cover-image-wrapper{

        display: flex;

        align-items: center;

    }

    .cover-preview{

        position: relative;

        height: 125px;

        width: 125px;

        margin-right: 10px;

        background: #fff;

        border: 1px dashed #ddd;

        border-radius: 4px;

        overflow: hidden;

        background-size: cover;

        background-position: 50% 50%;

        img{

            position: absolute;

            z-index: 10;

            width: 125px;

            height: 125px;
        }

        .ant-progress{

            position: absolute;

            top: 50%;

            left: 50%;

            transform: translate(-50%,-50%);

            z-index: 0;

        }

        .ant-btn{

            position: absolute;

            top: 50%;

            left: 50%;

            transform: translate(-50%,-50%);

            z-index: 20;

            display: none;

        }

        &:hover{

            .ant-btn{display: block;}

        }

    }

    .create-itinerary{

        padding-bottom: 100px;

    }


    .action-bar{

        position: fixed;

        bottom: 0;

        left: 0;

        width: 100vw;

        padding: 20px;

        background: #fff;

        border-top: 1px solid #ddd;

        button{

            width: auto;

            float: right;

        }

    }

</style>