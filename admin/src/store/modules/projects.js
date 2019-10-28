import Vue from 'vue';
import Axios from 'axios';

const state = {
  projects: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  projects: state => {
    return state.projects;
  },
  findProjects: state => id => state.projects.find(s => s._id == id)
};
const mutations = {
  SET_PROJECT: (state, payload) => {
    state.projects = payload;
  },
  ADD_PROJECT: (state, payload) => {
    state.projects.push(payload);
  },
  EDIT_PROJECT: (state, projects) => {
    const index = state.projects.findIndex(s => s._id == projects._id);
    Vue.set(state.projects, index, projects);
  }
};
const actions = {
  GET_PROJECT: async context => {
    let projects = await Axios.get(
      'http://localhost:8086/api/v1/projects/',
      state.headers
    );
    context.commit('SET_PROJECT', projects.data.data.doc);
  },
  SAVE_PROJECT: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/projects/',
      payload.data,
      { headers: payload.config }
    );
    console.log(data);
    context.commit('ADD_PROJECT', data.data.data.doc);
  },

  UPDATE_PROJECT: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/projects/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_PROJECT', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
