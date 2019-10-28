import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import categories from './modules/categories';
import supplierType from './modules/supplierType';
import specifierType from './modules/specifierTypes';
import projectType from './modules/projectType';
import keyProjects from './modules/keyProjects';
import sector from './modules/sector';
import products from './modules/products';
import Suppliers from './modules/supplier';
import city from './modules/city';
import country from './modules/country';
import Specifier from './modules/specifier';
import Projects from './modules/projects';
import Contacts from './modules/contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    Suppliers,
    Specifier,
    Projects,
    Contacts,
    categories,
    supplierType,
    specifierType,
    projectType,
    keyProjects,
    sector,
    products,
    city,
    country
  }
});
