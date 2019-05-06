<template>
    
</template>

<script>

    import { GET_ITINERARY_BY_SLUG, GET_ITINERARY_BY_ID  } from "@/server/queries/itinerary-queries";

    export default {
        name: "index",

        async asyncData ({ app,  params, store }) {

            await store.dispatch('auth/setToken');

            const TOKEN = app.$cookies.get("token") ;

            return  app.$axios({

                url: `/api/media/image/cjtv1x7f939rg0163lt1ozb9g/1200x`,

                method: 'POST',

                data: { token: TOKEN }

            }).then( res => {

                console.log("SUCCESS", res)

                // return { itinerary : res.data }

            }).catch( err => {

                console.log("ERROR CLIENT",err)

            })


        },

    }
</script>

<style scoped>

</style>