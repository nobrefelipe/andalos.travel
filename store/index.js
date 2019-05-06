import Vue from 'vue'
import Vuex from 'vuex'
import itineraries from './modules/itineraries';
import auth from './modules/auth';

Vue.use(Vuex)

const createStore = () => {

    return new Vuex.Store({

        modules: { itineraries, auth }

    });


};

export default createStore