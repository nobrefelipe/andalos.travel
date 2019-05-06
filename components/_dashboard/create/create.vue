<!--
    CREATE BUTTON
    HANDLES THE CREATION OF A STAGE
    GETS THE TITLE PASSED INTO THE CREATE MODAL
    EMIT EVENT created-new-stage SO WE CAN RENDER THE NEW STAGE

    @param {query} graphql query to perform the creation
    @param {parentId} string with the id of the parent element

-->
<template>

    <div>

        <!-- show loading block while loading-->
        <!--<a-button type="dashed"  class="create-stage-button" v-if="loading" :loading="loading"></a-button>-->

        <a-button type="dashed"  class="create-stage-button" @click="showModal" >

            <a-icon  v-if="!loading" type="plus-circle" size="large"  />

            <a-icon v-if="loading" type="loading" size="large"  />

        </a-button>


        <create-modal
                ref="collectionForm"
                :visible="visible"
                @cancel="handleCancel"
                @create="handleCreate"
        />

    </div>

</template>

<script>

    import client from '@/server/client';

    import CreateModal from "./create-modal";

    export default {

        components: { CreateModal },

        props:[ "query", "parentId" ],

        data () {
            return {

                visible: false,

                loading: false
            };
        },

        methods:{

            showModal () {
                this.visible = true;
            },
            handleCancel  () {
                this.visible = false;
            },

            handleCreate  () {

                const FORM = this.$refs.collectionForm.form;

                //const ITINERARY_ID = this.$route.params.itineraryID;

                FORM.validateFields((err, values) => {

                    if (err) { return; }


                    this.loading = true;

                    const VARIABLES = {

                        id: this.parentId,

                        title: values.title

                    };

                    client.request(this.query, VARIABLES).then( res => {

                        this.$message.success('Success');

                        this.$root.$emit('created-new-stage');

                        this.loading = false;

                    } );

                    FORM.resetFields();

                    this.visible = false;

                });

            },
        }

    }

</script>

<style scoped lang="scss">

    .create-stage-button{

        float: left;

        width: 100%;

        height: 80px;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        font-size: 40px;

        margin: 10px 0 0 0;

        i{

            opacity: 0.7;

        }
    }


</style>