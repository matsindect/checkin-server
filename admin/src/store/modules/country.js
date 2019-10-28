import Vue from 'vue';
import Axios from 'axios';

const state = {
  country: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  country: state => {
    return state.country;
  },
  findCountry: state => id => state.country.find(s => s._id == id)
};
const mutations = {
  SET_COUNTRY: (state, payload) => {
    state.country = payload;
  },
  ADD_COUNTRY: (state, payload) => {
    state.country.push(payload);
  },
  EDIT_COUNTRY: (state, country) => {
    const index = state.country.findIndex(s => s._id == country._id);
    Vue.set(state.country, index, country);
  }
};
const actions = {
  GET_COUNTRY: async context => {
    let country = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/country/',
      state.headers
    );
    context.commit('SET_COUNTRY', country.data.data.doc);
  },
  SAVE_COUNTRY: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/country/',
      payload.data,
      { headers: payload.config }
    );
   // console.log(data.data.data.doc);
    context.commit('ADD_COUNTRY', data.data.data.doc);
  },

  UPDATE_COUNTRY: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/country/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_COUNTRY', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
