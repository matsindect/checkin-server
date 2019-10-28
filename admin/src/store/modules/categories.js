import Vue from 'vue';
import Axios from 'axios';

const state = {
  categories: [],
  file: '',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  file: state => {
    return state.file;
  },
  categories: state => {
    return state.categories;
  },
  findCategory: state => id => state.categories.find(s => s._id == id),
  isLoaded: state => !!state.categories.length
};
const mutations = {
  SET_CATEGORIES: (state, payload) => {
    state.categories = payload;
  },
  ADD_CATEGORIES: (state, payload) => {
    state.categories.push(payload);
  },
  EDIT_CATEGORIES: (state, categories) => {
    const index = state.categories.findIndex(s => s._id == categories._id);
    Vue.set(state.categories, index, categories);
  }
};
const actions = {
  GET_CATEGORIES: async context => {
    let categories = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/categories/',
      state.headers
    );
    context.commit('SET_CATEGORIES', categories.data.data.doc);
  },
  SAVE_CATEGORIES: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/categories/',
      payload.data,
      { headers: payload.config }
    );
    // console.log(data.data.data.doc);
    context.commit('ADD_CATEGORIES', data.data.data.doc);
  },

  UPDATE_CATEGORIES: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/categories/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_CATEGORIES', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
