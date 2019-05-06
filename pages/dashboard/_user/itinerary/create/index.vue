<template>

    <section>

        <h3 class="dashboard-page-title">CREATE ITINERARY</h3>

        <CreateItinerary/>

    </section>

</template>

<script>

    import CreateItinerary from "./create-itinerary";

    export default {

        layout: "dashboard",

        components: { CreateItinerary },

    }
</script>

<style scoped>

</style>