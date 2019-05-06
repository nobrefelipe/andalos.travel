<template>

    <section class="login-form">

        <a-form
                layout="vertical"
                :form="form"
                @submit="handleSubmit">

            <span v-if="invalidCredentials" class="error">Username or password incorrect</span>

            <a-form-item
                    :validate-status="userNameError() ? 'error' : ''"
                    :help="userNameError() || ''">

                <a-input
                        v-decorator="[
                          'userName',
                          {rules: [{ required: true, message: 'Please input your username!' }]}
                        ]"
                        size="large"
                        placeholder="Username">

                    <a-icon
                            slot="prefix"
                            type="user"
                            style="color:rgba(0,0,0,.25)"/>

                </a-input>

            </a-form-item>

            <a-form-item
                    :validate-status="passwordError() ? 'error' : ''"
                    :help="passwordError() || ''">

                <a-input
                        v-decorator="[
                          'password',
                          {rules: [{ required: true, message: 'Please input your Password!' }]}
                        ]"
                         size="large"
                        type="password"
                        placeholder="Password">

                    <a-icon
                            slot="prefix"
                            type="lock"
                            style="color:rgba(0,0,0,.25)"/>

                </a-input>

            </a-form-item>

            <a-form-item>

                <a-button
                        type="primary"
                        html-type="submit"
                        size="large"
                        block
                        :loading="loading"
                        :disabled="hasErrors(form.getFieldsError())">

                    Log in

                </a-button>

            </a-form-item>

        </a-form>

    </section>

</template>

<script>

    import client from '@/server/client';

    import { SignInUser } from "@/server/queries/user-queries";

    function hasErrors (fieldsError) {

        return Object.keys(fieldsError).some(field => fieldsError[field]);

    }


    export default {

        data () {

            return {

                hasErrors,

                loading: false,

                invalidCredentials: false,

                form: this.$form.createForm(this)

            };

        },

        mounted () {

            this.$nextTick(() => {

                // To disabled submit button at the beginning.
                this.form.validateFields();

            });

        },

        methods: {

            // Only show error after a field is touched.
            userNameError () {

                const { getFieldError, isFieldTouched } = this.form;

                return isFieldTouched('userName') && getFieldError('userName');

            },

            // Only show error after a field is touched.
            passwordError () {

                const { getFieldError, isFieldTouched } = this.form;

                return isFieldTouched('password') && getFieldError('password');

            },

            handleSubmit  (e) {

                let vm = this;

                e.preventDefault();

                this.form.validateFields((err, values) => {

                    if (!err) {

                        this.loading = true;

                        const variables = {

                            email: values.userName,

                            password: values.password

                        };

                        client.request(SignInUser, variables)

                            .then( res => {

                                // Make sure the user is logged in
                                if(res.signinUser.user){

                                    this.invalidCredentials = false;

                                    // save the token as a cookie to authenticate the app
                                    this.$cookies.set('token', res.signinUser.token, {
                                        path: '/',
                                        maxAge: 60 * 60 * 24 * 7
                                    });

                                    this.$cookies.set('userId', res.signinUser.user.id, {
                                        path: '/',
                                        maxAge: 60 * 60 * 24 * 7
                                    })

                                    this.$router.push({
                                        path: `/dashboard/${res.signinUser.user.id}`
                                    })

                                    this.loading = false;

                                }

                            }).catch( error => {

                                console.log(error)

                                // just making sure we clear it
                                localStorage.removeItem('token')

                                // Show error
                                this.invalidCredentials = true;

                                this.loading = false;


                            });


                    }

                });

            },

        },

    };

</script>

<style scoped lang="scss">

    .login-form{

        width: 90%;

        max-width: 400px;

        .error{

            float: left;

            padding: 10px;

            color: red;
        }

    }

</style>