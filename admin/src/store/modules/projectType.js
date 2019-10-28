import Vue from 'vue';
import Axios from 'axios';

const state = {
  projecttype: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  projecttype: state => {
    return state.projecttype;
  },
  findProjectType: state => id => state.projecttype.find(s => s._id == id)
};
const mutations = {
  SET_PROJECTTYPE: (state, payload) => {
    state.projecttype = payload;
  },
  ADD_PROJECTTYPE: (state, payload) => {
    state.projecttype.push(payload);
  },
  EDIT_PROJECTTYPE: (state, projecttype) => {
    const index = state.projecttype.findIndex(s => s._id == projecttype._id);
    Vue.set(state.projecttype, index, projecttype);
  }
};
const actions = {
  GET_PROJECTTYPE: async context => {
    let projecttype = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/project-types/',
      state.headers
    );
    context.commit('SET_PROJECTTYPE', projecttype.data.data.doc);
  },
  SAVE_PROJECTTYPE: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/project-types/',
      payload.data,
      { headers: payload.config }
    );
    // console.log(data.data.data.doc);
    context.commit('ADD_PROJECTTYPE', data.data.data.doc);
  },

  UPDATE_PROJECTTYPE: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/project-types/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_PROJECTTYPE', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
