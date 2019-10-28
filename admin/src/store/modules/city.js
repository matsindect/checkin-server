import Vue from 'vue';
import Axios from 'axios';

const state = {
  city: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  city: state => {
    return state.city;
  },
  findCity: state => id => state.city.find(s => s._id == id)
};
const mutations = {
  SET_CITY: (state, payload) => {
    state.city = payload;
  },
  ADD_CITY: (state, payload) => {
    state.city.push(payload);
  },
  EDIT_CITY: (state, city) => {
    const index = state.city.findIndex(s => s._id == city._id);
    Vue.set(state.city, index, city);
  }
};
const actions = {
  GET_CITY: async context => {
    let city = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/city/',
      state.headers
    );
    context.commit('SET_CITY', city.data.data.doc);
  },
  SAVE_CITY: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/city/',
      payload.data,
      { headers: payload.config }
    );
    // console.log(data.data.data.doc);
    context.commit('ADD_CITY', data.data.data.doc);
  },

  UPDATE_city: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/city/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_CITY', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
