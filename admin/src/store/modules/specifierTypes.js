import Vue from 'vue';
import Axios from 'axios';

const state = {
  specifiertype: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  specifiertype: state => {
    return state.specifiertype;
  },
  findSpecifierType: state => id => state.specifiertype.find(s => s._id == id)
};
const mutations = {
  SET_SPECIFIERTYPE: (state, payload) => {
    state.specifiertype = payload;
  },
  ADD_SPECIFIERTYPE: (state, payload) => {
    state.specifiertype.push(payload);
  },
  EDIT_SPECIFIERTYPE: (state, specifiertype) => {
    const index = state.specifiertype.findIndex(
      s => s._id == specifiertype._id
    );
    Vue.set(state.specifiertype, index, specifiertype);
  }
};
const actions = {
  GET_SPECIFIERTYPE: async context => {
    let specifiertype = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/specifier-types/',
      state.headers
    );
    context.commit('SET_SPECIFIERTYPE', specifiertype.data.data.doc);
  },
  SAVE_SPECIFIERTYPE: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/specifier-types/',
      payload.data,
      { headers: payload.config }
    );
    //   console.log(data.data.data.doc);
    context.commit('ADD_SPECIFIERTYPE', data.data.data.doc);
  },

  UPDATE_SPECIFIERTYPE: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/specifier-types/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_SPECIFIERTYPE', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
