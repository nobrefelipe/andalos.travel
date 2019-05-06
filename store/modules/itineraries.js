/** Store module to handle trips lists **/

import Vue from 'vue'

import client from '~/server/client'

import { ALL_ITINERARIES_HOME } from "@/server/queries/itinerary-queries";

export default {

    namespaced: true,

    // ----------------------------------------------------------------------------------

    state: {

        itineraries: [],

        loaded: false

    },

    // ----------------------------------------------------------------------------------

    getters: {

        collection: state => state.itineraries,

        loaded: state => state.loaded

    },

    // ----------------------------------------------------------------------------------
    mutations: {

        setItineraries: (state, itineraries) => {

            Vue.set(state, 'itineraries', itineraries)

        },

        loaded: state => Vue.set(state, 'loaded', true)

    },

    // ----------------------------------------------------------------------------------

    actions: {


         async nuxtServerInit( { dispatch } ) {

             await dispatch('getItineraries');

        },


        getCachedItineraries : (context) => {

            let cachedState = localStorage.getItem('vuex');

            context.commit('setItineraries', []);

            console.log(JSON.parse(cachedState).itineraries.itineraries)

            context.commit('setItineraries', JSON.parse(cachedState).itineraries.itineraries)

        },


        getItineraries: (context) => {

            let getTrips = client.request(ALL_ITINERARIES_HOME);

            getTrips.then(response => {

                // uses Vue.set to be sure to be deeply reactive
                context.commit('setItineraries', response.allItineraries);

                context.commit('loaded');

                return Promise.resolve(context.state.itineraries);

            });

            getTrips.catch(error => {

                console.log(error)
                // in case of error, empties the trips collection
                context.commit('setItineraries', [])

                return Promise.reject(error)

            })

        }

    }
}