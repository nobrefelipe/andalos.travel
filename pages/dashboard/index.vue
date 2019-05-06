<template>

    <section class="login-screen">

        <div v-show="!$nuxt.isOnline" class="offline-banner">No internet connection</div>

        <Login/>


    </section>

</template>

<script>


    import { _allUsersMeta } from "@/server/queries/user-queries";

    import Login from "@/components/_dashboard/login";

    export default {

        name: "dashboard",

        layout: "dashboard",

        components: { Login },



    }
</script>

<style scoped lang="scss">

    .login-screen{

        height: 100vh;

        display: flex;

        align-items: center;

        justify-content: center;

    }

</style>