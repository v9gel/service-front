import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from "./views/Login";
import Orders from "./views/Orders";
import References from "./views/References";
import Clients from "./views/Clients";
import OneClient from "./views/OneClient";
import Help from "./views/Help";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/references',
      name: 'references',
      component: References
    },
    {
      path: '/references/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/references/clients/:id',
      name: 'one_client',
      component: OneClient
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
