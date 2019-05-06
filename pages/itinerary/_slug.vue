<template>

    <section class="itinerary-page" >


        <section class="page-hero">

        <picture>
            <source media="(max-width: 500px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/600x`">
            <source media="(max-width: 1024px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/900x`">
            <source media="(min-width: 1024px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/1400x`">
            <img v-lazy-load-image :data-src="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/1400x`" :alt="itinerary.title">
        </picture>

            <!-- MAKE OWN COMPONENT-->
        <div class="page-title-wrapper">

            <h1 v-html="itinerary.title"></h1>

            <div class="rating-and-location">

                <span class="itinerary-item--rate"><a-rate :defaultValue="5" disabled /></span>

                <span class="location">

                    <img src="https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png" alt="location">

                    Thailand

                </span>

            </div>

        </div>

    </section>

        <!-- TABS -->
        <div class="sticky-top" id="tabs-desktop">

            <nav class="itinerary-navigation" ref="TABS" @click="onTabChange">

                <div class="outter">

                    <span class="tab-item"
                          v-for="(stage, index) in itinerary.stages"
                          :data-id="stage.id"
                          :key="stage.id">

                        {{ stage.title }}

                    </span>

                </div>

            </nav>

        </div>


        <icon-component icon-name="thailand" class="country-map-bg" />

        <!-- OVERVIEW / INTRO-->
        <div class="itinerary-overview" id="overview">

            <div class="wrapper" >


                <h5 v-if="$device.isDesktop">Backpacking</h5>

                <!--<h2>-->

                    <!--Criamos uma trip massa para você curtir com 20 pessoas pela Tailândia!-->

                <!--</h2>-->

                <div v-html="itinerary.description"></div>


                <div class="row is-flexy is-center" style="margin-top: 20px">

                    <div class="button primary"  @click="gotToStages" v-touch="gotToStages">

                        SEE PLACES

                        <IconComponent icon-name="arrow" style="transform: rotate(90deg); transform-origin: 125% 55%"/>

                    </div>

                </div>

            </div>

        </div>


        <!-- EXPERIENCES -->
        <div class="wrapper">

            <section class="itinerary-experiences">

                <h3>EXPERIENCES</h3>

                <div class="itinerary-experiences--item">

                    <icon-component icon-name="drink"/>

                    <span>Night Life</span>

                </div>

                <div class="itinerary-experiences--item">

                    <icon-component icon-name="direction"/>

                    <span>Night Life</span>

                </div>

                <div class="itinerary-experiences--item">

                    <icon-component icon-name="activity"/>

                    <span>Night Life</span>

                </div>

                <div class="itinerary-experiences--item">

                    <icon-component icon-name="calendar"/>

                    <span>Night Life</span>

                </div>

                <div class="itinerary-experiences--item">

                    <icon-component icon-name="drink"/>

                    <span>Night Life</span>

                </div>
            </section>

        </div>


        <!--<section v-if="$device.isDesktop" style="height: 500px" class="page-hero">-->

            <!--<picture>-->
                <!--<source media="(max-width: 500px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/400x`">-->
                <!--<source media="(max-width: 1024px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/900x`">-->
                <!--<source media="(min-width: 1024px)" :srcset="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/1400x`">-->
                <!--<img v-lazy-load-image :data-src="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/1400x`" :alt="itinerary.title">-->
            <!--</picture>-->


        <!--</section>-->


        <!-- STAGES DESKTOP -->
        <div  v-if="$device.isDesktop" class="wrapper __desktop" >

            <div id="stages" class="itinerary-stages">

                <article v-for="(stage, index) in itinerary.stages"
                         :key="stage.id"
                         :data-id="stage.id"
                         :id="stage.id"
                         class="itinerary-stages--item">


                    <div class="head">

                        <div class="itinerary-stages--item-days">

                            <div class="is-flexy is-column is-center">
                                <span class="label">day</span>
                                <span class="total-days">{{ stage.days }}</span>

                            </div>

                        </div>

                        <h2 class="stage-title">{{ stage.title }}</h2>

                    </div>

                    <div class="body">

                        <picture><img :src="`https://images.graph.cool/v1/cjtmzncsi0n4a01674y8tv1u1/${itinerary.coverImageSecret}/900x`" alt=""></picture>

                        <div>

                            <!--<h3>Vamos buscar você no aeroporto e levar para um hostel super bem localizada no coraçāo de Bangkok</h3>-->
                            <p class="stage-description" v-html="stage.description"></p>



                            <!-- EXTERNAL :  Accommodations & Activities-->
                            <section class="stage-externals">

                                <h3>ACCOMMODATIONS</h3>

                                <a v-for="(accommodation, index) in stage.accomodations"
                                   :href="accommodation.link"
                                   :title="accommodation.title"
                                   :key="accommodation.id"
                                   class="stage-externals--item"
                                   target="_blank">

                                    <picture><img v-lazy-load-image v-if="accommodation.imageUrl" :data-src="accommodation.imageUrl" :alt="accommodation.title"></picture>

                                    <div class="stage-externals--item-body">

                                        <h5>{{ accommodation.title }}</h5>

                                        <h6>{{ accommodation.price }}</h6>

                                    </div>

                                    <a-icon type="ellipsis" size="large"/>

                                </a>

                            </section>

                            <section class="stage-externals">

                                <h3>ACTIVITIES</h3>

                                <a v-for="(activity, index) in stage.activities"
                                   :href="activity.link"
                                   :title="activity.title"
                                   :key="activity.id"
                                   class="stage-externals--item"
                                   target="_blank">

                                    <picture><img v-lazy-load-image v-if="activity.imageUrl" :data-src="activity.imageUrl" :alt="activity.title"></picture>

                                    <div class="stage-externals--item-body">

                                        <h5>{{ activity.title }}</h5>

                                        <h6>{{ activity.price }} / person</h6>

                                    </div>

                                    <a-icon type="ellipsis" size="large"/>

                                </a>
                            </section>


                        </div>

                    </div>

                </article>

            </div>



        </div>



        <!-- STAGES MOBILE -->
        <div v-if="$device.isMobileOrTablet" class="__mobile wrapper no-left-padding">

            <section id="stages" class="itinerary-stages">

                <!-- STAGES -->
                <article v-for="(stage, index) in itinerary.stages"
                         :key="stage.id"
                         :id="stage.id"
                         class="itinerary-stages--item">

                    <!-- STAGE DAYS -->
                    <div class="left">

                        <div class="itinerary-stages--item-days">

                            <!--<div v-if="index == 0" class="is-flexy is-column is-center">-->
                            <!--<span class="total-days">{{ totalDays }}</span>-->
                            <!--<span class="label">days</span>-->
                            <!--</div>-->

                            <!--<div v-elseclass="is-flexy is-column is-center">-->
                            <!--<span class="total-days">{{ index+1 }}º</span>-->
                            <!--<span class="label">day</span>-->
                            <!--</div>-->

                            <div class="is-flexy is-column is-center">
                                <span class="label">day</span>
                                <span class="total-days">{{ stage.days }}</span>
                            </div>

                        </div>

                    </div>

                    <!-- STAGE CONTENT -->
                    <div class="right">

                        <!--<h2 v-if="index == 0" class="stage-title">-->

                        <!--Overview-->

                        <!--<span class="itinerary-item&#45;&#45;rate"><a-rate :defaultValue="5" disabled /></span>-->

                        <!--</h2>-->

                        <!--v-else-->
                        <h2 class="stage-title">{{ stage.title }}</h2>

                        <div class="stage-description" v-html="stage.description"></div>

                        <!-- EXTERNAL :  Accommodations & Activities-->
                        <section class="stage-externals">

                            <a-collapse accordion :bordered="false">

                                <!-- ACCOMMODATION -->
                                <a-collapse-panel header="Accommodations" key="1">

                                    <!--<p>Recommended by {{ itinerary.designer.name }}</p>-->

                                    <div class="stage-externals--outter">

                                        <a v-for="(accommodation, index) in stage.accomodations"
                                           :href="accommodation.link"
                                           :title="accommodation.title"
                                           :key="accommodation.id"
                                           class="stage-externals--item"
                                           target="_blank">

                                            <picture><img v-lazy-load-image v-if="accommodation.imageUrl" :data-src="accommodation.imageUrl" :alt="accommodation.title"></picture>

                                            <div class="stage-externals--item-body">

                                                <h5>{{ accommodation.title }}</h5>

                                                <h6>{{ accommodation.price }}</h6>

                                            </div>

                                            <a-icon type="ellipsis" size="large"/>

                                        </a>


                                    </div>

                                </a-collapse-panel>

                                <!-- ACTIVITIES -->
                                <a-collapse-panel header="Activities" key="2">

                                    <div class="stage-externals--outter" >
                                        <a v-for="(activity, index) in stage.activities"
                                           :href="activity.link"
                                           :title="activity.title"
                                           :key="activity.id"
                                           class="stage-externals--item"
                                           target="_blank">

                                            <picture><img v-lazy-load-image v-if="activity.imageUrl" :data-src="activity.imageUrl" :alt="activity.title"></picture>

                                            <div class="stage-externals--item-body">

                                                <h5>{{ activity.title }}</h5>

                                                <h6>{{ activity.price }} / person</h6>

                                            </div>

                                            <a-icon type="ellipsis" size="large"/>

                                        </a>
                                    </div>

                                </a-collapse-panel>

                            </a-collapse>

                        </section>


                    </div>

                </article>

            </section>

        </div>





    </section>

</template>

<script>

    import moment from "moment";

    import IconComponent from "@/components/icon-component";

    import { GET_ITINERARY_BY_SLUG, ALL_ITINERARIES } from "@/server/queries/itinerary-queries";

    export default {

        name: "Itinerary",

        layout: "default",

        components: { IconComponent},

        async asyncData ({ app,  params, store }) {

            const TOKEN = app.$cookies.get("token") ;

            const slug = params.slug;


            app.$axios.defaults.baseURL = process.env.baseUrl;

            return  app.$axios({

                url: `/api/itinerary/slug/${slug}`,

                method: 'POST',

                data: { query: {GET_ITINERARY_BY_SLUG}, token: TOKEN }

            }).then( res => {

                return { itinerary: res.data}

            }).catch( err => {

                console.log("error", err)

            })

        },



        computed:{

            totalDays(){ return this.calculateDays(this.itinerary.endDate, this.itinerary.startDate)}

        },

        methods:{

            calculateDays(endDate, startDate){

                var a = moment(startDate, "DD.MM.YYYY");
                var b = moment(endDate, "DD.MM.YYYY");

                return b.diff(a, 'days')+1

            },

            gotToStages(){

                console.log(document.getElementById("stages"))
                // scroll the page to the tabs section
                window.scroll({
                    left: 0,
                    top: document.getElementById("stages").offsetTop - 50,
                    behavior: "smooth"
                });

            },

            onTabChange(e){


                let target = e.target;


                // EVENT DELEGATION
                if (target.classList.contains("tab-item")){

                    let siblings = this.getSiblings(target);

                    siblings.forEach( e => e.classList.remove("current"))

                    target.classList.add("current");

                    let elm = document.getElementById(target.dataset.id);

                    // If mobile the spacing is only the header height ( 50px )
                    // If desktop the spacing will be header height + tabs height ( 100px )
                    let spacingFromTop = this.$device.isMobileOrTablet ? 50 : 100;



                    // scroll the page to the tabs section
                    window.scroll({
                        left: 0,
                        top: elm.offsetTop - spacingFromTop,
                        behavior: "smooth"
                    });

                }

            },


        }

    }

</script>

<style scoped>

</style>