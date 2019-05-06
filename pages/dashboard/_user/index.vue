<template>

    <div>

        <a-icon  v-if="!user" class="loading" type="loading" style="font-size: 50px; position: absolute; left:50%; top:50%;"/>

        <section v-if="user" class="user-area">

            <h3 class="dashboard-page-title">welcome back <strong>{{ currentUser.name }}</strong></h3>

            <section class="dashboard-user-itineraries">

                    <a-card v-for="(itinerary, index) of currentUserItineraries"
                            :id="itinerary.id"
                            :key="index"
                            class="itinerary-item">

                        <img :src="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/400x`" slot="cover"/>

                        <a-card-meta :title="itinerary.title"/>

                        <template class="ant-card-actions" slot="actions">

                            <nuxt-link :to="`/dashboard/${$route.params.user}/itinerary/${itinerary.id}`" ><a-icon type="edit" /></nuxt-link>

                            <delete-by-id :query="DELETE_ITINERARY" :id="itinerary.id"/>

                        </template>

                    </a-card>


            </section>

        </section>


    </div>

</template>

<script>

    import client from '@/server/client';

    import DeleteById from '@/components/_dashboard/delete-by-id';

    import { User } from "@/server/queries/user-queries";

    import { DELETE_ITINERARY } from "@/server/queries/itinerary-queries";

    export default {

        name: "user",

        layout: "dashboard",

        components: { DeleteById },

        data: () => ({

            user: null,

            DELETE_ITINERARY: DELETE_ITINERARY,

            API_SECRET: 'cjtmzncsi0n4a01674y8tv1u1',

        }),

        computed:{

            currentUser(){

                return this.user;

            },

            currentUserItineraries(){

                return this.user.itineraries

            }

        },

        mounted(){

            this.getItineraries();

        },

        methods:{

            getItineraries(){

                const USER_ID = this.$route.params.user;

                client.request(User, {id: USER_ID}).then( res => this.user = res.User );

            },


        }


    }
</script>

<style lang="scss">


</style>
