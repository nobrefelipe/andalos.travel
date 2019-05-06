<template>

    <input type="search" ref="address-input" :placeholder="country" />

</template>

<script>
    export default {

        name: "location-autocomplete",

        props:["countryObj"],

        computed:{

            country(){

                return this.countryObj ? this.countryObj.value : "Location"

            }

        },

        mounted(){

            let vm = this;

            var places = require('places.js');
            var placesAutocomplete = places({
                appId: 'plQB23E5NQID',
                apiKey: '86fbbb03f6e6c17da7dcf77674a04acb',
                language:'en',
                container: vm.$refs['address-input']
            });

            placesAutocomplete.on('change', e => {

                vm.$root.$emit("location-autocomplete", e.suggestion)

            });


        }

    }
</script>
