import Vue from 'vue';
import Axios from 'axios';

const state = {
  suppliertype: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  suppliertype: state => {
    return state.suppliertype;
  },
  findSupplierType: state => id => state.suppliertype.find(s => s._id == id)
};
const mutations = {
  SET_SUPPLIERTYPE: (state, payload) => {
    state.suppliertype = payload;
  },
  ADD_SUPPLIERTYPE: (state, payload) => {
    state.suppliertype.push(payload);
  },
  EDIT_SUPPLIERTYPE: (state, suppliertype) => {
    const index = state.suppliertype.findIndex(s => s._id == suppliertype._id);
    Vue.set(state.suppliertype, index, suppliertype);
  }
};
const actions = {
  GET_SUPPLIERTYPE: async context => {
    let suppliertype = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/supplier-types/',
      state.headers
    );
    context.commit('SET_SUPPLIERTYPE', suppliertype.data.data.doc);
  },
  SAVE_SUPPLIERTYPE: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/supplier-types/',
      payload.data,
      { headers: payload.config }
    );
    //  console.log(data.data.data.doc);
    context.commit('ADD_SUPPLIERTYPE', data.data.data.doc);
  },

  UPDATE_SUPPLIERTYPE: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/supplier-types/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_SUPPLIERTYPE', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
