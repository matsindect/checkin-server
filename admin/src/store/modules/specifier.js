import Vue from 'vue';
import Axios from 'axios';

const state = {
  specifier: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  specifier: state => {
    return state.specifier;
  },
  findSpecifier: state => id => state.specifier.find(s => s._id == id)
};
const mutations = {
  SET_SPECIFIER: (state, payload) => {
    state.specifier = payload;
  },
  ADD_SPECIFIER: (state, payload) => {
    state.specifier.push(payload);
  },
  EDIT_SPECIFIER: (state, specifier) => {
    const index = state.specifier.findIndex(s => s._id == specifier._id);
    Vue.set(state.specifier, index, specifier);
  }
};
const actions = {
  GET_SPECIFIER: async context => {
    let specifier = await Axios.get(
      'http://localhost:8086/api/v1/specifiers/',
      state.headers
    );
    context.commit('SET_SPECIFIER', specifier.data.data.doc);
  },
  SAVE_SPECIFIER: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/specifiers/',
      payload.data,
      { headers: payload.config }
    );
    //  console.log(data.data.data.doc);
    context.commit('ADD_SPECIFIER', data.data.data.doc);
  },

  UPDATE_SPECIFIER: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/specifiers/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_SPECIFIER', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
