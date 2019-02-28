import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const state = {
    entities: [],
    filteredEntities: [],
    filters: {
        country: '',
        sector: ''
    }
};

const actions = {
    LOAD_ENTITIES: context => {
        axios.get('https://spreadsheets.google.com/feeds/list/1s8yMnY-Ks6SG-agOWSpd5wnlZyXdENWW2xZ3ABCowho/1/public/values?alt=json')
            .then(response => {
                context.commit('SET_ENTITIES', { response: response.data.feed.entry });
            });
    }
};

const mutations = {
    SET_ENTITIES: (state, payload) => {
        state.entities = payload.response.map( (obj) => {
            obj.favorite = false;
            return obj;
        } );
    },
    SET_FAVORITE: (state, payload) => {
        let selected = state.entities.find( x => x.gsx$nombre.$t === payload.name);
        selected.favorite = !selected.favorite;
    },
    SET_SEARCH: (state, payload) => {
        state.entities = state.entities.filter(x => x.gsx$nombre.$t.toLowerCase().indexOf(payload.query.toLowerCase()) > -1);
    },
    SET_FILTERS: (state, payload) => {
        state.filteredEntities = state.entities.filter( x => {
                if (state.filters.sector !== '' && state.filters.country !== '') {
                    return x.gsx$industria.$t.toLowerCase() === state.filters.sector.toLowerCase() && x.gsx$país.$t.toLowerCase() === payload.country.toLowerCase()
                }

                if (state.filters.sector === '' && state.filters.country !== '') {
                    return x.gsx$país.$t.toLowerCase() === payload.country.toLowerCase()
                }

                if (state.filters.sector !== '' && state.filters.country === '') {
                    return x.gsx$industria.$t.toLowerCase() === state.filters.sector.toLowerCase()
                }
            }
        )
    },
    SET_FILTER_VALUE: (state, payload) => {
        state.filters.country = payload.country;
        state.filters.sector = payload.sector;
    }
};

const getters = {
    GET_ENTITIES: state => {
        return state.entities;
    },
    GET_FAVORITES: state => {
        return state.entities.filter(x => x.favorite === true);
    },
    GET_FILTERED: state => {
        return state.filteredEntities;
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})