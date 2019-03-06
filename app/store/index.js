import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import axios from 'axios';

const _ = require('lodash');

Vue.use(Vuex);

const state = {
    entities: [],
    filteredEntities: [],
    filters: {
        country: '',
        sector: '',
        solution: ''
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
                if (state.filters.sector !== '' && state.filters.country !== '' && state.filters.solution !== '') {
                    return x.gsx$industria.$t.toLowerCase() === state.filters.sector.toLowerCase() && x.gsx$país.$t.toLowerCase() === payload.country.toLowerCase() && x.gsx$tipodesolución.$t.toLowerCase() === state.filters.solution.toLowerCase()
                }

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
        state.filters.solution = payload.solution;
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
    },
    GET_BY_COUNTRY: state => {
        const brazil = state.entities.filter(x => x.gsx$país.$t.toLowerCase() === 'brasil').length;
        const sweeden = state.entities.filter(x => x.gsx$país.$t.toLowerCase() === 'suecia').length;
        const usa = state.entities.filter(x => x.gsx$país.$t.toLowerCase() === 'estados unidos').length;
        const peru = state.entities.filter(x => x.gsx$país.$t.toLowerCase() === 'peru').length;
        const norwen = state.entities.filter(x => x.gsx$país.$t.toLowerCase() === 'noruega').length;

        return {
            data: [
                {Country: 'Brasil', Amount: brazil},
                {Country: 'Suecia', Amount: sweeden},
                {Country: 'USA', Amount: usa},
                {Country: 'Perú', Amount: peru},
                {Country: 'Noruega', Amount: norwen},
            ]
        }
    },
    GET_BY_SOLUTION: state => {
        const bi = state.entities.filter(x => x.gsx$tipodesolución.$t.toLowerCase() === 'bi').length;
        const producto = state.entities.filter(x => x.gsx$tipodesolución.$t.toLowerCase() === 'producto').length;
        const otros = state.entities.filter(x => x.gsx$tipodesolución.$t.toLowerCase() === 'otros').length;
        const plataforma = state.entities.filter(x => x.gsx$tipodesolución.$t.toLowerCase() === 'plataforma').length;
        const iot = state.entities.filter(x => x.gsx$tipodesolución.$t.toLowerCase() === 'iot').length;

        return [
            { Solution: 'BI', Amount: bi },
            { Solution: 'Producto', Amount: producto },
            { Solution: 'Otros', Amount: otros },
            { Solution: 'Plataforma', Amount: plataforma },
            { Solution: 'IoT', Amount: iot }
        ]

    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})