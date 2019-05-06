<!--
    CREATE MODAL
    WILL PROMPT WITH A MODAL TO CREATE THE STAGE PROVIDING A TITLE

-->
<template>

    <a-modal
            :visible="visible"
            title='ADD NEW'
            okText='CREATE'
            @cancel="() => { $emit('cancel') }"
            @ok="() => { $emit('create') }">

        <a-form layout='vertical' :form="form">

            <a-form-item label='Title'>
                <a-input
                        v-decorator="[
                          'title',
                              {
                                rules: [{ required: true, message: 'Please provide a title!' }],
                              }
                            ]"/>

            </a-form-item>

        </a-form>

    </a-modal>

</template>

<script>
    export default {
        name: "create-modal",

        props: ['visible'],

        beforeCreate () {

            this.form = this.$form.createForm(this);

        },
    }

</script>
