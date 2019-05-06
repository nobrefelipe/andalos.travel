<!--

    LIST ALL ACCOMMODATIONS

-->

<template>

    <section class="row">

        ACCOMMODATIONS

        <div class="stages-wrapper">

            <div class="dashboard-table">

                <div class="dashboard-table--row"
                     v-if="allAccommodations"
                     v-for="(activity, index) of allAccommodations"
                     :id="activity.id"
                     :key="index">

                    <span>{{ activity.title }}</span>

                    <div class="is-flexy">

                        <edit-activity :query="UPDATE_ACCOMMODATION" :id="activity.id"/>

                        <delete-by-id :query="DELETE_ACCOMMODATION" :id="activity.id"/>

                    </div>

                </div>

            </div>

            <create-activity :query="CREATE_ACCOMMODATION" :parent-id="$route.params.stageID"/>

        </div>

    </section>

</template>

<script>

    import client from '@/server/client';

    import CreateActivity from "@/components/_dashboard/create/create";

    import EditActivity from "@/components/_dashboard/activities/edit";

    import DeleteById from '@/components/_dashboard/delete-by-id';

    import { CREATE_ACCOMMODATION, ACCOMMODATIONS_BY_STAGE, DELETE_ACCOMMODATION, UPDATE_ACCOMMODATION } from "@/server/queries/accommodations-queries";

    export default {

        name: "Accommodations",

        components: { CreateActivity, EditActivity, DeleteById },

        layout: "dashboard",

        data(){

            return{

                accommodations: null,

                CREATE_ACCOMMODATION: CREATE_ACCOMMODATION,

                DELETE_ACCOMMODATION: DELETE_ACCOMMODATION,

                UPDATE_ACCOMMODATION: UPDATE_ACCOMMODATION

            }

        },

        computed: {

            allAccommodations(){ return this.accommodations }

        },

        mounted(){

            this.getActivities();

            // UPDATE THE STAGES
            this.$root.$on('created-new-stage', this.getActivities);

        },


        methods:{


            getActivities(){

                const STAGE_ID = this.$route.params.stageID;

                client.request(ACCOMMODATIONS_BY_STAGE, {id: STAGE_ID}).then( res => {

                    console.log(res)

                    this.accommodations = res.allAccommodations

                } );

            },


        }

    }

</script>

<style scoped lang="scss">




</style>