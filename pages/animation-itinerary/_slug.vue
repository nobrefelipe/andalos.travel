<template>

    <section class="itinerary-page">

        <section class="page-hero">

            <picture>
                <source media="(max-width: 500px)" :srcset="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/400x`">
                <source media="(max-width: 1024px)" :srcset="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/900x`">
                <source media="(min-width: 1024px)" :srcset="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/1200x`">
                <img v-lazy-load-image :data-src="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/1200x`"
                     :alt="itinerary.title">
            </picture>

            <h1 v-html="itinerary.title"></h1>

        </section>


        <div class="wrapper">

            <nav class="itinerary-navigation">

                <div class="outter">

                    <span class="current">Overview</span>
                    <span>Day 1</span>
                    <span>Day 2</span>
                    <span>Day 3</span>
                    <span>Day 4</span>
                    <span>Day 5</span>
                    <span>Day 6</span>
                    <span>Day 7</span>
                    <span>Day 8</span>

                </div>

            </nav>

        </div>

        <div class="wrapper no-left-padding">

            <section class="itinerary-stages">

                <article class="itinerary-stages--item">

                    <div class="left">

                        <div class="itinerary-stages--item-days">

                            <span class="total-days">8</span>
                            <span class="label">days</span>

                        </div>

                    </div>

                    <div class="right">

                        <h2 class="stage-title">Overview</h2>

                        <p class="stage-description">

                            We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.
                            We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.
                            We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.
                            We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.
                        </p>


                    </div>

                </article>

                <article class="itinerary-stages--item">

                    <div class="left">

                        <div class="itinerary-stages--item-days">

                            <span class="total-days">1º</span>
                            <span class="label">day</span>

                        </div>

                    </div>

                    <div class="right">

                        <h2 class="stage-title">Bangkok</h2>

                        <p class="stage-description">We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.</p>


                    </div>

                </article>

                <article class="itinerary-stages--item">

                    <div class="left">

                        <div class="itinerary-stages--item-days">

                            <span class="total-days">2º</span>
                            <span class="label">day</span>

                        </div>

                    </div>

                    <div class="right">

                        <h2 class="stage-title">Koh Samui</h2>

                        <p class="stage-description">We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.</p>


                    </div>

                </article>


                <article class="itinerary-stages--item">

                    <div class="left">

                        <div class="itinerary-stages--item-days">

                            <span class="total-days">3º</span>
                            <span class="label">day</span>

                        </div>

                    </div>

                    <div class="right">

                        <h2 class="stage-title">Koh Tao</h2>

                        <p class="stage-description">We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.</p>


                    </div>

                </article>

            </section>

        </div>


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

        }),


        async asyncData ({ app,  params, store }) {

            const slug = params.slug;

            return client.request(GET_ITINERARY_BY_SLUG, {slug: slug})

                .then(response => {

                    // console.log(response)
                    //console.log(store.state.itineraries)

                    return { itinerary: response.Itinerary}

                    return Promise.resolve(store.state.itineraries);

                });


        },

    }

</script>

<style scoped>

</style>