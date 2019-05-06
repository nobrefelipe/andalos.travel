<!--

    LIST ALL STAGES
    AND THE CREATE STAGE BUTTON COMPONENT

-->

<template>

    <section class="row">

        STAGES

        <div class="stages-wrapper">

            <!-- show loading block while loading-->
            <a-button v-if="!allStages" type="dashed" class="stage" :loading="true" style="font-size: 40px"></a-button>

            <div class="dashboard-table">

                <div class="dashboard-table--row"
                     v-if="allStages"
                     v-for="(stage, index) in allStages"
                     :id="stage.id"
                     :key="index">

                   <span>{{ stage.title }}</span>

                   <div class="is-flexy">

                       <a-button @click="onClickEditStage(stage.id)"><a-icon type="edit" /></a-button>

                       <delete-by-id :query="DELETE_STAGE" :id="stage.id"/>

                   </div>

                </div>

            </div>


            <create-stage :query="CREATE_STAGE" :parent-id="$route.params.itineraryID"/>

        </div>

    </section>

</template>

<script>

    import client from '@/server/client';

    import CreateStage from "@/components/_dashboard/create/create";

    import DeleteById from '@/components/_dashboard/delete-by-id';

    import { stagesByIntinerary, DELETE_STAGE, CREATE_STAGE } from "@/server/queries/stages-queries"

    export default {

        components: { CreateStage, DeleteById },

        layout: "dashboard",

        data(){

            return{

                stages: null,

                DELETE_STAGE: DELETE_STAGE,

                CREATE_STAGE : CREATE_STAGE
            }

        },

        computed: {

            allStages(){

                return this.stages;

            }

        },

        mounted(){

            this.getStages();

            // UPDATE THE STAGES
            this.$root.$on('created-new-stage', this.getStages);

        },


        methods:{


            getStages(){

                const ITINERARY_ID = this.$route.params.itineraryID;

                console.log(ITINERARY_ID)

                client.request(stagesByIntinerary, {itineraryID: ITINERARY_ID}).then( res => {

                    this.stages = res.allStages

                } );

            },

            onClickEditStage(id){

                this.$router.push({
                    path: `/dashboard/${this.$route.params.user}/itinerary/${this.$route.params.itineraryID}/stages/${id}`
                })

            },


        }

    }

</script>

<style scoped lang="scss">



</style>