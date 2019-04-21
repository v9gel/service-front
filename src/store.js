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
    setStatuses(state, statuses){
      state.statuses = statuses
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
        dispatch('getModels');
        dispatch('getViews');
        dispatch('getStatuces');
        dispatch('getServices');
        dispatch('getDefects');
        dispatch('getSubdivisions');
        dispatch('getActivities');
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
    },
    getProviders({commit}){
    Vue.axios.get(API +'/references/providers')
      .then((response) => {
          commit('setProviders', response.data)
      });
    },
    addProvider({dispatch}, client){
    Vue.axios.post(API +'/references/providers', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getProviders')
          }
      });
    },
    editProvider({dispatch}, client){
    Vue.axios.post(API +'/references/providers/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getProviders')
          }
      });
    },
    deleteProvider({dispatch}, id){
    Vue.axios.delete(API +'/references/providers/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getProviders')
          }
      });
    },
    getSubdivisions({commit}){
    Vue.axios.get(API +'/references/subdivisions')
      .then((response) => {
          commit('setSubdivisions', response.data)
      });
    },
    addSubdivision({dispatch}, client){
    Vue.axios.post(API +'/references/subdivisions', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getSubdivisions')
          }
      });
    },
    editSubdivision({dispatch}, client){
    Vue.axios.post(API +'/references/subdivisions/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getSubdivisions')
          }
      });
    },
    deleteSubdivision({dispatch}, id){
    Vue.axios.delete(API +'/references/subdivisions/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getSubdivisions')
          }
      });
    },
    getActivities({commit}){
    Vue.axios.get(API +'/references/activities')
      .then((response) => {
          commit('setActivities', response.data)
      });
    },
    addActivitie({dispatch}, client){
    Vue.axios.post(API +'/references/activities', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getActivities')
          }
      });
    },
    editActivitie({dispatch}, client){
    Vue.axios.post(API +'/references/activities/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getActivities')
          }
      });
    },
    deleteActivitie({dispatch}, id){
    Vue.axios.delete(API +'/references/activities/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getActivities')
          }
      });
    },
    getDefects({commit}){
    Vue.axios.get(API +'/references/defects')
      .then((response) => {
          commit('setDefects', response.data)
      });
    },
    addDefect({dispatch}, client){
    Vue.axios.post(API +'/references/defects', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getDefects')
          }
      });
    },
    editDefect({dispatch}, client){
    Vue.axios.post(API +'/references/defects/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getDefects')
          }
      });
    },
    deleteDefect({dispatch}, id){
    Vue.axios.delete(API +'/references/defects/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getDefects')
          }
      });
    },
    getOrders({commit}){
    Vue.axios.get(API +'/references/orders')
      .then((response) => {
          commit('gesOrders', response.data)
      });
    },
    addOrder({dispatch}, client){
    Vue.axios.post(API +'/references/orders', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getOrders')
          }
      });
    },
    editOrder({dispatch}, client){
    Vue.axios.post(API +'/references/orders/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getOrders')
          }
      });
    },
    deleteOrder({dispatch}, id){
    Vue.axios.delete(API +'/references/orders/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getOrders')
          }
      });
    },
    getServices({commit}){
    Vue.axios.get(API +'/references/services')
      .then((response) => {
          commit('setServices', response.data)
      });
    },
    addService({dispatch}, client){
    Vue.axios.post(API +'/references/services', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getServices')
          }
      });
    },
    editService({dispatch}, client){
    Vue.axios.post(API +'/references/services/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getServices')
          }
      });
    },
    deleteService({dispatch}, id){
    Vue.axios.delete(API +'/references/services/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getServices')
          }
      });
    },
    getStatuses({commit}){
    Vue.axios.get(API +'/references/statuses')
      .then((response) => {
          commit('setStatuses', response.data)
      });
    },
    addStatus({dispatch}, client){
    Vue.axios.post(API +'/references/statuses', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getStatuses')
          }
      });
    },
    editStatus({dispatch}, client){
    Vue.axios.post(API +'/references/statuses/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getStatuses')
          }
      });
    },
    deleteStatus({dispatch}, id){
    Vue.axios.delete(API +'/references/statuses/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getStatuses')
          }
      });
    },
    getViews({commit}){
    Vue.axios.get(API +'/references/views')
      .then((response) => {
          commit('setViews', response.data)
      });
    },
    addView({dispatch}, client){
    Vue.axios.post(API +'/references/views', client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getViews')
          }
      });
    },
    editView({dispatch}, client){
    Vue.axios.post(API +'/references/views/' + client.id, client)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getViews')
          }
      });
    },
    deleteView({dispatch}, id){
    Vue.axios.delete(API +'/references/views/' + id)
      .then((response) => {
          if(response.data.msg === 'ok'){
              dispatch('getViews')
          }
      });
    },
  }
})
