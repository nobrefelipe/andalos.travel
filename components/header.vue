<template>

    <header class="header" ref="header">

        <a-button v-if="showPrevButton" class="left-button" type="primary" icon="left" size="large" @click="$router.go(-1)"></a-button>

        <nuxt-link to="/" >

            <section class="logo"><img src="~/static/img/logo-grey-bg-small.png" alt=""> <span>Andalos</span></section>
            <!--<section class="logo"><span>Andalos</span></section>-->

        </nuxt-link>


        <a-button v-if="showPrevButton" class="right-button" type="primary" size="large" @click="showModal">?</a-button>



        <a-modal title="About the Itinerary"
                v-model="visible"
                okText="Yes, get me to her!"
                @ok="handleOk"
                centered>

            <p>
                This itinerary was created by <strong>Natalia Sclipet</strong>
                <br><br>
                If you need any help or would like to customize it, <br>
                you can contact her direct on Instagram. <br>
                She will be glad to help.
            </p>

        </a-modal>

    </header>


</template>

<script>
    export default {

        name: "header-component",

        data: () => ({

            hasPreviewsRoute: false,

            visible: false

        }),

        computed:{

            showPrevButton() { return this.hasPreviewsRoute; }

        },


        watch: {
            $route: function() {
                if(this.$route.fullPath != "/" && this.$device.isMobile){
                    this.hasPreviewsRoute = true;
                }else{
                    this.hasPreviewsRoute = false;
                }
            }
        },

        methods:{

            showModal() {
                this.visible = true
            },

            handleOk(e) {

                this.visible = false

                window.open('http://instagram.com/na.puravida','_blank');

            },

        },

        mounted(){

            if(this.$route.fullPath != "/" && this.$device.isMobile){
                this.hasPreviewsRoute = true;
            }else{
                this.hasPreviewsRoute = false;
            }


            let scrollpos = window.scrollY;

            const header = this.$refs.header;

            const add_class_on_scroll = () => header.classList.add("scroll");

            const remove_class_on_scroll = () => header.classList.remove("scroll");

            window.addEventListener('scroll', function() {

                scrollpos = window.scrollY;

                if (scrollpos >= 140) { add_class_on_scroll() }

                else { remove_class_on_scroll() }

            })

        },
    }
</script>

<style scoped lang="scss">

    @import "../assets/scss/helpers/breakpoints";

    .logo{

        float: left;

        display: flex;

        align-items: center;

        transition: all .3s ease;

        *{transition: all .3s ease;}

        img{ height: 40px; margin: 10px 0 0 10px;}

        span{

            font-size: 20px;

            margin: 0 0 0 15px;

            transform: translateY(7px);

            color: #fff;

            font-family: "Futura W01 ExtraBold Condensed";

        }


        .scroll &{

            margin: 0;

            img{ height: 50px; margin: 0}

            span{  transform: translateY(3px); color: #47494e;}// dark grey

        }


        @include mobile{

            img{display: none;}

            span{

                color: #47494e;

                margin: 3px 0 0 0;

                transform: none !important;

            }

        }

    }

    .header{

        position: fixed;

        top: 0; left: 0;

        z-index: 1000;

        background: transparent;

        width: 100vw;

        height: 50px;

        transition: all .3s ease;

        box-shadow: 0 0 3px 0 rgba(0,0,0,0);

        display: flex;

        justify-content: space-between;

        align-items: center;


        &.scroll{

            background: #F9F9F9;

            box-shadow: 0 0 3px 0 rgba(0,0,0,.3);


            @include mobile{background:  rgb(254,201,64);}
        }

        button{

            color: #fff;

            position: absolute;

            top: 0;

            height: 100%;

            width: 50px;

        }

        .left-button{ left: 0;}

        .right-button{ right: 0; }

        @include mobile{

            justify-content: center;

            /*background: #F9F9F9;*/

            background:  rgb(254,201,64);

            box-shadow: 0 0 3px 0 rgba(0,0,0,.3);


        }


    }


</style>