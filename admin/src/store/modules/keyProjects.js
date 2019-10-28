import Vue from 'vue';
import Axios from 'axios';

const state = {
  keyprojects: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  keyprojects: state => {
    return state.keyprojects;
  },
  findKeyProjects: state => id => state.keyprojects.find(s => s._id == id)
};
const mutations = {
  SET_KEYPROJECTS: (state, payload) => {
    state.keyprojects = payload;
  },
  ADD_KEYPROJECTS: (state, payload) => {
    state.keyprojects.push(payload);
  },
  EDIT_KEYPROJECTS: (state, keyprojects) => {
    const index = state.keyprojects.findIndex(s => s._id == keyprojects._id);
    Vue.set(state.keyprojects, index, keyprojects);
  }
};
const actions = {
  GET_KEYPROJECTS: async context => {
    let keyprojects = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/key-projects/',
      state.headers
    );
    context.commit('SET_KEYPROJECTS', keyprojects.data.data.doc);
  },
  SAVE_KEYPROJECTS: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/key-projects/',
      payload.data,
      { headers: payload.config }
    );
    //  console.log(data.data.data.doc);
    context.commit('ADD_KEYPROJECTS', data.data.data.doc);
  },

  UPDATE_KEYPROJECTS: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/key-projects/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_KEYPROJECTS', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
