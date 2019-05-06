<template>

    <section class="itinerary-page">

        <section class="page-hero">

            <picture><img v-lazy-load-image :data-src="imgA"></picture>


        </section>

    </section>

</template>

<script>
    import axios from "axios"

    import client from "@/server/client";

    import { GET_ITINERARY_BY_SLUG, ALL_ITINERARIES } from "@/server/queries/itinerary-queries";

    export default {

        name: "Itinerary",

        layout: "default",

        data: () => ({

            API_SECRET: 'cjtmzncsi0n4a01674y8tv1u1',

            img: ""

        }),

        computed:{

            imgA(){return this.img}

        },

        beforeMount() {

            console.log(this.$route.params)

            const rootEl = document.documentElement
            const { left, top } = this.$route.params.position
            const  elWidth  = this.$route.params.elWidth
            const  img  = this.$route.params.img

            this.img = img;

            let offsetLeft = 0;
            let offsetTop = 50;

            const transX = -(left - offsetLeft)
            const transY = -(top - offsetTop)

            const w = window.innerWidth;

            const scale = w / elWidth;

            el.style.setProperty('--translate-tile', `translate(${transX}px, ${transY}px) scale(${scale})`);

            scroll(0, 0)

        }




    }

</script>

<style scoped>

</style>