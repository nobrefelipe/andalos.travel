
import Vue from 'vue'


export default {

    namespaced: true,

    // ----------------------------------------------------------------------------------

    state: {

        token: null

    },

    // ----------------------------------------------------------------------------------

    mutations: {

        setToken: (state, token) => {

            Vue.set(state, 'token', token)

        },

    },

    // ----------------------------------------------------------------------------------

    actions: {


        setToken: (context) => {

            context.commit('setToken', "")

        }

    }
}