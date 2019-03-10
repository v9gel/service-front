import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from "./views/Login";
import Orders from "./views/Orders";
import References from "./views/References";
import Clients from "./views/Clients";
import OneClient from "./views/OneClient";
import Models from "./views/Models";
import Views from "./views/Views";
import Help from "./views/Help";
import Providers from "./views/Providers";
import Packs from "./views/Packs";
import Statuces from "./views/Statuces";
import Services from "./views/Services";
import Defects from "./views/Defects";

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
      path: '/references/models',
      name: 'models',
      component: Models
    },
    {
      path: '/references/providers',
      name: 'providers',
      component: Providers
    },
    {
      path: '/references/views',
      name: 'views',
      component: Views
    },
    {
      path: '/references/packs',
      name: 'packs',
      component: Packs
    },
    {
      path: '/references/statuces',
      name: 'statuces',
      component: Statuces
    },
    {
      path: '/references/services',
      name: 'services',
      component: Services
    },
    {
      path: '/references/defects',
      name: 'defects',
      component: Defects
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
