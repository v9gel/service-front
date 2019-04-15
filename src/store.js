import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var API = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    orders: [],
    clients: []
  },
  mutations: {
    addOrder(state, order){
      state.orders.push(order)
    },
    setClients(state, clients){
      state.clients = clients
    }
  },
  actions: {
    initStore({dispatch}){
      dispatch('getClients')
    },
    getClients({commit}){
      Vue.axios.get(API +'/references/clients')
          .then((response) => {
            commit('setClients', response.data)
          });
    },
    addClient({dispatch}, client){
      Vue.axios.post(API +'/references/clients', client)
          .then((response) => {
            if(response.data.msg === 'ok'){
              dispatch('getClients')
            }
      });
    },
    editClient({dispatch}, client){
      Vue.axios.post(API +'/references/clients/' + client.id, client)
          .then((response) => {
            if(response.data.msg === 'ok'){
              dispatch('getClients')
            }
          });
    },
    deleteClient({dispatch}, id){
      Vue.axios.delete(API +'/references/clients/' + id)
          .then((response) => {
            if(response.data.msg === 'ok'){
              dispatch('getClients')
            }
          });
    }
  }
})
