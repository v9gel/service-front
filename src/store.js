import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var API = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    orders: [],
      
    clients: [],
    packs: [],
    models:[],
    providers:[],
    views:[],
    statuces:[],
    services:[],
    defects:[],
    subdivisions:[],
    activities:[]
  },
  mutations: {
    addOrder(state, order){
      state.orders.push(order)
    },
    setClients(state, clients){
      state.clients = clients
    },
    setPacks(state, packs){
      state.packs = packs
    },
    setModels(state, models){
      state.models = models
    },
    setViews(state, views){
      state.views = views
    },
    setStatuces(state, statuces){
      state.statuces = statuces
    },
    setServices(state, services){
      state.services = services
    },
    setDefects(state, defects){
      state.defects = defects
    },
    setSubdivisions(state, subdivisions){
      state.subdivisions = subdivisions
    },
    setActivities(state, activities){
      state.activities = activities
    },




  },
  actions: {
    initStore({dispatch}){
      dispatch('getClients');
      dispatch('getPacks');
        dispatch('setModels');
        dispatch('setViews');
        dispatch('setStatuces');
        dispatch('setServices');
        dispatch('setDefects');
        dispatch('setSubdivisions');
        dispatch('setActivities');
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
    },
    getPacks({commit}){
      Vue.axios.get(API +'/references/packs')
          .then((response) => {
              commit('setPacks', response.data)
          });
    },
    addPack({dispatch}, packs){
      Vue.axios.post(API +'/references/packs', packs)
          .then((response) => {
              if(response.data.msg === 'ok'){
                  dispatch('getPacks')
              }
          });
    },
    editPack({dispatch}, packs){
      Vue.axios.post(API +'/references/packs/' + packs.id, packs)
          .then((response) => {
              if(response.data.msg === 'ok'){
                  dispatch('getPacks')
              }
          });
    },
    deletePack({dispatch}, id){
      Vue.axios.delete(API +'/references/packs/' + id)
          .then((response) => {
              if(response.data.msg === 'ok'){
                  dispatch('getPacks')
              }
          });
    }
  }
})
