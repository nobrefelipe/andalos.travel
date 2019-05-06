<!--
    EDIT BUTTON

    Handles the editing of a Activity

    EMIT EVENT created-new-stage SO WE CAN RENDER THE NEW STAGE

    @param {query} graphql query to perform the creation
    @param {parentId} string with the id of the parent element

-->
<template>

    <div>

        <a-button @click="showModal" >

            <a-icon type="edit" size="large"  />

        </a-button>


        <create-modal
                ref="editForm"
                :visible="visible"
                @cancel="handleCancel"
                @save="handleSave"
        />

    </div>

</template>

<script>

    import client from '@/server/client';

    import CreateModal from "./edit-modal";

    export default {

        components: { CreateModal },

        props:[ "query", "id" ],

        data () {
            return {

                visible: false,

            };
        },

        methods:{

            showModal () {
                this.visible = true;
            },
            handleCancel  () {
                this.visible = false;
            },

            handleSave  () {

                const FORM = this.$refs.editForm.form;

                FORM.validateFields((err, values) => {

                    if (err) { return; }


                    const VARIABLES = {

                        id: this.id,

                        title: values.title,

                        imageUrl: values.imageUrl,

                        price: values.price,

                        link: values.link

                    };

                    console.log(VARIABLES);

                    client.request(this.query, VARIABLES).then( res => {

                        console.log(res);

                        this.$root.$emit('created-new-stage');

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

        width: 120px;

        height: 120px;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        font-size: 40px;

        margin: 5px;

        i{

            opacity: 0.7;

        }
    }


</style>