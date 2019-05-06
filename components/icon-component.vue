<!--

    Icon Component
    Receives a prop of icon-name with the name of the SVG icon we want to use
    Use dynamic component to render the right icon based on the above prop

-->

<template>

    <div><component :is="icon"></component></div>

</template>

<script>

    export default {

        name: "IconComponent",

        props: {

            iconName: {

                type: String,

                required: true

            }

        },

        computed:{

            icon(){

                return () => import('@/assets/svg/' + this.iconName + '.svg');

            }

        }

    }

</script>