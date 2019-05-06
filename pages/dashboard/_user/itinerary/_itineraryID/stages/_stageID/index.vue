<template>


    <div>

        <a-icon  v-if="!stage" class="loading" type="loading" style="font-size: 50px; position: absolute; left:50%; top:50%;"/>

        <section v-if="stage" class="create-itinerary">

            <h2>Editing stage : {{ stage.title }}</h2>


            <div class="is-flexy is-full">

                <section class="container">
                    <div class="quill-editor"
                         v-model="content"
                         v-quill:myQuillEditor="editorOption">
                    </div>
                </section>

            </div>


            <a-form :form="form">

                <!-- TITLE -->
                <a-form-item>

                    <a-input v-decorator="[
                          'title',
                          {rules: [{ required: true }]}
                         ]"
                             :placeholder="stage.title"
                             addonBefore="Title"
                             size="large"/>

                </a-form-item>

                <!--DAYS-->
                <a-form-item>

                    <a-input v-decorator="[
                          'days',
                          {rules: [{ required: true }]}
                         ]"
                             :placeholder="stage.days"
                             addonBefore="Days"
                             size="large"/>


                </a-form-item>

                <activities/>

                <accommodations />

                <div class="action-bar">

                    <a-button type="primary" html-type="submit" size="large" :loading="loading" @click="saveStage">SAVE</a-button>

                </div>


            </a-form>

        </section>

    </div>


</template>

<script>

    import client from '@/server/client';

    import Activities from "./activities/index";

    import Accommodations from "./accommodations/index";

    import { Stage, UPDATE_STAGE } from "@/server/queries/stages-queries";

    export default {

        layout: "dashboard",

        components: { Activities, Accommodations },

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

                stage: null,

                form: this.$form.createForm(this),

                loading: false

            }

        },

        mounted(){

            this.getStage();


        },

        methods:{

            getStage(){

                const STAGE_ID = this.$route.params.stageID;

                client.request(Stage, {id: STAGE_ID}).then( res => {

                    // // Set Initial Values
                    this.form.getFieldDecorator('title', { initialValue: res.Stage.title });
                    // this.form.getFieldDecorator('description', { initialValue: res.Stage.description });
                    this.form.getFieldDecorator('days', { initialValue: res.Stage.days || '' });

                    this.content = res.Stage.description;
                    this.stage = res.Stage

                } );


            },

            updateStage(variables){

                this.loading = true;

                client.request(UPDATE_STAGE, variables)

                    .then( res => {

                        this.loading = false;

                        this.$message.success('SAVED');

                    }).catch( error => {

                        console.log(error)

                        this.loading = false;

                        this.$message.error('Something went wrong saving the itinerary');

                    });

            },

            async saveStage() {

                this.form.validateFields((err, values) => {

                    if (!err) {

                        values.id = this.$route.params.stageID;
                        values.description = this.content

                        this.updateStage(values)

                    }

                });
            },

        }

    }
</script>


<style scoped lang="scss">


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