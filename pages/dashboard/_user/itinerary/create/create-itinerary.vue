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

                <a-button type="primary" html-type="submit" size="large" block @click="saveItinerary">SAVE & CONTINUE</a-button>

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

        methods:{


            createItinerary(variables){

                client.request(createItinerary, variables)

                    .then( res => {

                        console.log(res);

                        this.$router.push({
                            path: `/dashboard/${this.$route.params.user}/itinerary/${res.createItinerary.id}`
                        })

                    }).catch( error => {

                        console.log(error)

                    });

            },

            saveItinerary() {

                this.form.validateFields((err, values) => {

                    if (!err) {

                        values.published = false;
                        values.designerId = this.$route.params.user;
                        values.slug = this.string_to_slug(values.title);

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