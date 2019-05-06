<template>

    <section class="create-itinerary">

        <a-form :form="form">

            <a-form-item>

                <a-input v-decorator="[
                          'title',
                          {rules: [{ required: true, message: 'Please provide a title to your itinerary' }]}
                         ]"
                         placeholder="Itinerary title"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'slug',
                          {rules: [{ required: true, message: 'Please provide a slug to your itinerary' }]}
                         ]"
                         placeholder="Slug"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'description',
                          {rules: [{ required: true, message: 'Please provide a description to your itinerary' }]}
                         ]"
                         placeholder="Itinerary description"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'coverImage',
                          {rules: [{ required: true, message: 'Please provide a cover Image to your itinerary' }]}
                         ]"
                         placeholder="Itinerary cover"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'style',
                          {rules: [{ required: true, message: 'Please provide a style to your itinerary' }]}
                         ]"
                         placeholder="Itinerary style"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'startDate',
                          {rules: [{ required: true, message: 'Please provide a start date to your itinerary' }]}
                         ]"
                         placeholder="Itinerary start date"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'endDate',
                          {rules: [{ required: true, message: 'Please provide a end date to your itinerary' }]}
                         ]"
                         placeholder="Itinerary end date"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'location',
                          {rules: [{ required: true, message: 'Please provide a location to your itinerary' }]}
                         ]"
                         placeholder="Itinerary location"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'difficultyLevel',
                          {rules: [{ required: true, message: 'Please provide a difficulty level to your itinerary' }]}
                         ]"
                         placeholder="Itinerary diffilcult level"
                         size="large"/>

            </a-form-item>

            <a-form-item>

                <a-input v-decorator="[
                          'budget',
                          {rules: [{ required: true, message: 'Please provide a budget to your itinerary' }]}
                         ]"
                         placeholder="Itinerary budget"
                         size="large"/>

            </a-form-item>


            <a-form-item>

                <a-button type="primary" html-type="submit" size="large" block @click="saveItinerary">SAVE</a-button>

            </a-form-item>

            <a-form-item>

                <a-button type="primary" html-type="submit" size="large" block @click="publishItinerary">PUBLISH</a-button>

            </a-form-item>

        </a-form>

    </section>

</template>

<script>

    import client from '@/server/client';

    import {createItinerary} from "@/server/queries/itinerary-queries";

    export default {
        name: "create-itinerary",

        data(){

            return{

                form: this.$form.createForm(this)

            }
        },


        mounted(){


        },

        methods:{

            createItinerary(variables){

                client.request(createItinerary, variables)

                    .then( res => {

                        console.log(res);

                    }).catch( error => {

                        console.log(error)

                    });

            },

            saveItinerary() {

                this.form.validateFields((err, values) => {

                    if (!err) {

                        values.designerId = this.$route.params.user;
                        values.published = false;

                        console.log(values);

                        this.createItinerary(values)

                    }

                });
            },


            publishItinerary() {

                this.form.validateFields((err, values) => {

                    if (!err) {

                        values.designerId = this.$route.params.user;
                        values.published = false;

                        console.log(values);

                        this.createItinerary(values)

                    }

                });
            },

        }
    }
</script>

<style scoped lang="scss">

    .create-itinerary{

        padding: 200px;

    }

</style>