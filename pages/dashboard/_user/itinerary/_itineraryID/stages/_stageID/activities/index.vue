<!--

    LIST ALL ACTIVITIES
    AND THE CREATE ACTIVITY BUTTON COMPONENT

-->

<template>

    <section class="row">

        ACTIVITIES

        <div class="stages-wrapper">

            <div class="dashboard-table">

                <div class="dashboard-table--row dashboard-activity"
                     v-if="allActivities"
                     v-for="(activity, index) of allActivities"
                     :id="activity.id"
                     :key="index">

                    <span>{{ activity.title }}</span>

                    <div class="is-flexy">

                        <edit-activity :query="UPDATE_ACTIVITY" :id="activity.id"/>

                        <delete-by-id :query="DELETE_ACTIVITY" :id="activity.id"/>

                    </div>

                </div>

            </div>


            <create-activity :query="CREATE_ACTIVITY" :parent-id="$route.params.stageID"/>

        </div>

    </section>

</template>

<script>

    import client from '@/server/client';

    import CreateActivity from "@/components/_dashboard/create/create";

    import EditActivity from "@/components/_dashboard/activities/edit";

    import DeleteById from '@/components/_dashboard/delete-by-id';

    import { CREATE_ACTIVITY, ACTIVITIES_BY_STAGE, DELETE_ACTIVITY, UPDATE_ACTIVITY } from "@/server/queries/activities-queries";

    export default {

        name: "Activities",

        components: { CreateActivity, EditActivity, DeleteById },

        layout: "dashboard",

        data(){

            return{

                activities: null,

                CREATE_ACTIVITY: CREATE_ACTIVITY,

                DELETE_ACTIVITY: DELETE_ACTIVITY,

                UPDATE_ACTIVITY: UPDATE_ACTIVITY

            }

        },

        computed: {

            allActivities(){ return this.activities }

        },

        mounted(){

            this.getActivities();

            // UPDATE THE STAGES
            this.$root.$on('created-new-stage', this.getActivities);

        },


        methods:{


            getActivities(){

                const STAGE_ID = this.$route.params.stageID;

                client.request(ACTIVITIES_BY_STAGE, {id: STAGE_ID}).then( res => {

                    console.log(res)

                    this.activities = res.allActivities

                } );

            },


        }

    }

</script>

<style scoped lang="scss">




</style>