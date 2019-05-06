<template>

    <a-button  @click="showDeleteConfirm"><a-icon type="delete" /></a-button>
    
</template>

<script>

    import client from '@/server/client';

    export default {

        name: "delete-by-id",

        props: ["query", "id"],

        methods:{

            delete(){

                client.request(this.query, {id: this.id}).then( res => {

                    this.$message.success('Success');

                }).catch( error => {

                    console.log(error)
                    this.$message.error('Something went wrong deleting the item');

                });

            },

            showDeleteConfirm(id) {

                let vm = this;

                let element = document.getElementById(`${vm.id}`);

                element.classList.add('deleting');

                this.$confirm({
                    title: 'DELETE ITEM?',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',

                    onOk() {

                        vm.delete(vm.id);

                        element.parentNode.removeChild(element);

                    },

                    onCancel(){

                        element.classList.remove('deleting');

                    }
                });

            },

        }

    }
</script>

