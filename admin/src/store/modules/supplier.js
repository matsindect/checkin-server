import Vue from "vue";
import Axios from "axios";

const state = {
  supplier: [],
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  formHeader: {
    "Content-Type": "multipart/form-data"
  }
};
const getters = {
  supplier: state => {
    return state.supplier;
  },
  findSupplier: state => id => state.supplier.find(s => s._id == id)
};
const mutations = {
  SET_SUPPLIER: (state, payload) => {
    state.supplier = payload;
  },
  ADD_SUPPLIER: (state, payload) => {
    state.supplier.push(payload);
  },
  EDIT_SUPPLIER: (state, supplier) => {
    const index = state.supplier.findIndex(s => s._id == supplier._id);
    Vue.set(state.supplier, index, supplier);
  }
};
const actions = {
  GET_SUPPLIER: async context => {
    let supplier = await Axios.get(
      "http://localhost:8086/api/v1/suppliers/",
      state.headers
    );
    context.commit("SET_SUPPLIER", supplier.data.data.doc);
  },
  SAVE_SUPPLIER: async (context, payload) => {
    console.log(payload);
    let data = await Axios.post(
      "http://localhost:8086/api/v1/suppliers/",
      payload.data,
      { headers: payload.config }
    );
    //  console.log(data.data.data.doc);
    context.commit("ADD_SUPPLIER", data.data.data.doc);
  },

  UPDATE_SUPPLIER: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/suppliers/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit("EDIT_SUPPLIER", data.data.data.supplier);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
