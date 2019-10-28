import Vue from 'vue';
import Axios from 'axios';

const state = {
  sector: [],
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  formHeader: {
    'Content-Type': 'multipart/form-data'
  }
};
const getters = {
  sector: state => {
    return state.sector;
  },
  findSectors: state => id => state.sector.find(s => s._id == id)
};
const mutations = {
  SET_SECTOR: (state, payload) => {
    state.sector = payload;
  },
  ADD_SECTOR: (state, payload) => {
    state.sector.push(payload);
  },
  EDIT_SECTOR: (state, sector) => {
    const index = state.sector.findIndex(s => s._id == sector._id);
    Vue.set(state.sector, index, sector);
  }
};
const actions = {
  GET_SECTOR: async context => {
    let sector = await Axios.get(
      'http://localhost:8086/api/v1/taxonomy/sectors/',
      state.headers
    );
    context.commit('SET_SECTOR', sector.data.data.doc);
  },
  SAVE_SECTOR: async (context, payload) => {
    let data = await Axios.post(
      'http://localhost:8086/api/v1/taxonomy/sectors/',
      payload.data,
      { headers: payload.config }
    );
    // console.log(data.data.data.doc);
    context.commit('ADD_SECTOR', data.data.data.doc);
  },

  UPDATE_SECTOR: async (context, { id, payload, config }) => {
    let data = await Axios.patch(
      `http://localhost:8086/api/v1/taxonomy/sectors/${id}`,
      payload,
      { header: config.headers }
    );

    context.commit('EDIT_SECTOR', data.data.data.doc);
  }
};
// "express": "^4.17.1",
export default {
  state,
  getters,
  mutations,
  actions
};
