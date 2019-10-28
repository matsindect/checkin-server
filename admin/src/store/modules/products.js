import Vue from 'vue';
import Axios from 'axios';

const state = {
  products: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  products: state => {
    return state.products;
  },
  findProducts: state => id => state.products.find(s => s._id == id)
};
const mutations = {
  SET_PRODUCTS: (state, payload) => {
    state.products = payload;
  },
  ADD_PRODUCTS: (state, payload) => {
    state.products.push(payload);
  },
  EDIT_PRODUCTS: (state, products) => {
    const index = state.products.findIndex(s => s._id == products._id);
    Vue.set(state.products, index, products);
  }
};
const actions = {
  GET_PRODUCTS: async context => {
    let products = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/products/',
      state.headers
    );
    context.commit('SET_PRODUCTS', products.data.data.doc);
  },
  SAVE_PRODUCTS: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/products/',
      payload.data,
      { headers: payload.config }
    );
    // console.log(data.data.data.doc);
    context.commit('ADD_PRODUCTS', data.data.data.doc);
  },

  UPDATE_PRODUCTS: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/products/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_PRODUCTS', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
