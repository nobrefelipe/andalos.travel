<!--
    EDIT MODAL
    WILL PROMPT WITH A MODAL TO EDIT THE ELEMENT

-->
<template>

    <a-modal
            :visible="visible"
            title='EDIT'
            okText='SAVE'
            @cancel="() => { $emit('cancel') }"
            @ok="() => { $emit('save') }">

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

            <a-form-item label='Image Url'>

                <a-input v-decorator="['imageUrl']"/>

            </a-form-item>


            <a-form-item label='Price'>

                <a-input v-decorator="['price']"/>

            </a-form-item>

            <a-form-item label='Link'>

                <a-input v-decorator="['link']"/>

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
