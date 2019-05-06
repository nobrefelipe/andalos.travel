<template>

  <section class="home-page">

   <section class="page-hero">

     <!--<img src="https://drscdn.500px.org/user_cover/11504333/q%3D65_m%3D2048/v2?webp=true&v=10&sig=9634d4eb6b768b02fe33f172fb2d4bdb0cdd866a723e3fe08accbc12a918105f" alt="">-->

     <div class="video-bg"  v-if="$device.isDesktop">

       <video loop="" autoplay preload="" muted="" id="html5_video_l2p87kb83k">
         <source data-src="https://www.contiki.com/v-ch195yo3k5ve/-/media/cml/video/homepage-search-widget/2019-ambient-videos-updated-spec-3.mp4" type="video/mp4" src="https://www.contiki.com/v-ch195yo3k5ve/-/media/cml/video/homepage-search-widget/2019-ambient-videos-updated-spec-3.mp4">
       </video>

     </div>

     <!--<h1>Free itineraries made by experts </h1>-->
     <h1>Free itineraries designed for you </h1>

   </section>

    <div class="home-page--above-the-folder wrapper">

        <div class="body-content center row">

            <h2>Real Experiences</h2>

            <p>We believe in real experiences. We create the itineraries that inspire you, excite you, challenge you, connect you with the world & stay with you for life. And we care about making sure these experiences contribute positively to the people and places you visit. Sustainability is as important as fun.</p>

        </div>

        <section class="itineraries row">

            <div class="outter">

                <a-skeleton avatar :paragraph="{rows: 3}" active title="false" :loading="!loaded" class="itinerary-item"/>
                <a-skeleton avatar :paragraph="{rows: 3}" active title="false" :loading="!loaded" class="itinerary-item"/>

                <nuxt-link v-if="loaded"
                           v-for="(itinerary, k) of itineraries"
                           :title="itinerary.title"
                           :key="k"
                           :to="`/itinerary/${itinerary.slug}`"
                           class="itinerary-item">

                    <figure class="itinerary-item--image">

                        <img v-lazy-load-image :data-src="`https://images.graph.cool/v1/${API_SECRET}/${itinerary.coverImageSecret}/500x`" :alt="itinerary.title">

                    </figure>

                    <div class="itinerary-item--body">

                        <h3 class="itinerary-item--title" v-html="itinerary.title"></h3>

                        <ul class="itinerary-item--meta">

                            <li>{{ itinerary.style }}</li>
                            <li>{{ itinerary.dificultyLevel }}</li>
                            <li>{{ itinerary.budget }}</li>

                        </ul>

                        <span class="itinerary-item--designer">By {{ itinerary.designer.name }}</span>

                        <span class="itinerary-item--rate"><a-rate :defaultValue="5" disabled /></span>

                    </div>

                </nuxt-link>


            </div>

        </section>



        <!--<section class="itineraries row" v-if="$device.isDesktop">-->


        <!--<nuxt-link to="#" title="Title here" class="itinerary-item">-->

          <!--<figure class="itinerary-item&#45;&#45;image"><img src="https://api.imanitrips.com/media/trips_cover_image/thaicover_jVDgEhr.jpg" alt=""></figure>-->

          <!--<div class="itinerary-item&#45;&#45;body">-->

            <!--<h3 class="itinerary-item&#45;&#45;title">Uma viagem muito louca na tailandia</h3>-->

            <!--<ul class="itinerary-item&#45;&#45;meta">-->

              <!--<li>Backpacking</li>-->
              <!--<li>Medium</li>-->
              <!--<li>$500 to $1000</li>-->

            <!--</ul>-->

            <!--<span class="itinerary-item&#45;&#45;designer">By Natalia Sclipet</span>-->

            <!--<span class="itinerary-item&#45;&#45;rate"><a-rate :defaultValue="5" disabled /></span>-->

          <!--</div>-->

        <!--</nuxt-link>-->

        <!--<nuxt-link to="#" title="Title here" class="itinerary-item">-->

          <!--<figure class="itinerary-item&#45;&#45;image"><img src="https://ihg.scene7.com/is/image/ihg/kimpton-barcelona-1700x750-v2" alt=""></figure>-->

          <!--<div class="itinerary-item&#45;&#45;body">-->

            <!--<h3 class="itinerary-item&#45;&#45;title">Barcelona cultural break</h3>-->

            <!--<ul class="itinerary-item&#45;&#45;meta">-->

              <!--<li>City Break</li>-->
              <!--<li>Easy</li>-->
              <!--<li>up to $500</li>-->

            <!--</ul>-->

            <!--<span class="itinerary-item&#45;&#45;designer">By Natalia Sclipet</span>-->

            <!--<span class="itinerary-item&#45;&#45;rate"><a-rate :defaultValue="5" disabled /></span>-->

          <!--</div>-->

        <!--</nuxt-link>-->



      <!--</section>-->

        <!--<div class="row spaced is-flexy is-center">-->

            <!--<nuxt-link to="#" title="" class="button primary">SEE ALL <IconComponent icon-name="arrow"/></nuxt-link>-->

        <!--</div>-->

    </div>



    <icon-component icon-name="world-map" class="world-map-bg" />

  </section>

</template>

<script>

  import IconComponent from "@/components/icon-component";

export default {

  components: { IconComponent },

    layout: "default",

    data: () => ({

        API_SECRET: 'cjtmzncsi0n4a01674y8tv1u1',

    }),


    computed: {

        itineraries(){

            return this.$store.getters['itineraries/collection'];

        },

        loaded(){ return this.$store.getters['itineraries/loaded']; }

    },

    mounted(){


        if(this.$nuxt.isOnline) {

            // Get all trips
            this.$store.dispatch('itineraries/nuxtServerInit', {});


        }else{

            console.log("OFFLINE")
            this.$store.dispatch('itineraries/getCachedItineraries', {});

        }



    },


    head () {

        return {

            title: 'Andalos | Free itineraries designed for you',

            meta: [
                { hid: `title`, property: 'title', content: 'Free itineraries designed for you' },
                { hid: 'description', name: 'description', content: 'Make money by creating trips, travel to epic places, group travel, travel with influencers, budget group trips' },
                { hid: `image`, property: 'image', content: 'https://api.imanitrips.com/media/trips_cover_image/thaicover.jpg' },
                { hid: `canonical`, property: 'canonical', href: 'https://www.andalos.travel' },
                { hid: `og:type`, property: 'og:type', content: 'website' },
                { hid: `og:title`, property: 'og:title', content: 'Free itineraries designed for you' },
                { hid: `og:image`, property: 'og:image', content: 'https://api.imanitrips.com/media/trips_cover_image/thaicover.jpg' },
                { hid: `og:description`, property: 'og:description', content: 'Make money by creating trips, travel to epic places, group travel, travel with influencers, budget group trips' },
                { hid: `og:url`, property: 'og:url', content: 'https://www.andalos.travel' },
            ],

            link: [
                { rel: 'canonical', href: 'https://www.andalos.travel/'}
            ]
        }

    }
}
</script>

<style lang="scss" scoped>

  .home-page{

    &--above-the-folder{

      @media all and (max-width: 614px){

        /*display: flex;*/

        /*flex-direction: column;*/

        /*.body-content{ order: 0;}*/
        /*.itineraries{ order: 1;}*/

      }

    }

  }

</style>
