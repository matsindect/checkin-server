import Vue from 'vue';
import Axios from 'axios';

const state = {
  contacts: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  contacts: state => {
    return state.contacts;
  },
  findContacts: state => id => state.contacts.find(s => s._id == id)
};
const mutations = {
  SET_CONTACT: (state, payload) => {
    state.contacts = payload;
  },
  ADD_CONTACT: (state, payload) => {
    state.contacts.push(payload);
  },
  EDIT_CONTACT: (state, contacts) => {
    const index = state.contacts.findIndex(s => s._id == contacts._id);
    Vue.set(state.contacts, index, contacts);
  }
};
const actions = {
  GET_CONTACT: async context => {
    let contacts = await Axios.get(
      'http://localhost:8086/api/v1/contacts/',
      state.headers
    );
    context.commit('SET_CONTACT', contacts.data.data.doc);
  },
  SAVE_CONTACT: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/contacts/',
      payload.data,
      { headers: payload.config }
    );
    //  console.log(data.data.data.doc);
    context.commit('ADD_CONTACT', data.data.data.doc);
  },

  UPDATE_CONTACT: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/contacts/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_CONTACT', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
