 //import Vue from 'vue';
 //import Vuex from 'vuex';

import { createStore } from 'vuex';

//Vue.use(Vuex);

const store =  createStore({
  state: {
    loggedInEmployee: null,
  },
  mutations: {
    setLoggedInEmployee(state, employeeId) {
      state.loggedInEmployee = employeeId;
    },
  },

//   actions: {
//     login({ commit }) {
//       // perform login and get employee ID from server
//       const employeeId = 1; // example
//       commit('setLoggedInEmployee', employeeId);
//     }
//   }
  
});

export default store;
