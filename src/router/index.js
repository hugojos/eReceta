import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/auth/Login.vue'
//import Register from '../views/auth/Register.vue'
//import NuevaReceta from '../views/NuevaReceta.vue'
//import Receta from '../views/Receta.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */  '../views/auth/Login.vue'),
    meta: {
      title: 'Iniciar sesión',
      auth: false,
    }
  },
  {
    path: '/registrarse',
    name: 'Register',
    //component: Register,
    component: () => import(/* webpackChunkName: "Register" */ '../views/auth/Register.vue'),
    meta: {
      title: 'Registrar medico',
      auth: false,
    }
  },
  {
    path: '/nueva-receta',
    name: 'NuevaReceta',
    //component: NuevaReceta,
    component: () => import(/* webpackChunkName: "NuevaReceta" */ '../views/NuevaReceta.vue'),
    meta: {
      title: 'Nuevo receta',
      auth: true,
    }
  },
  {
    path: '/firmar',
    name: 'Firmar',
    //component: NuevaReceta,
    component: () => import(/* webpackChunkName: "NuevaReceta" */ '../views/Firmar.vue'),
    meta: {
      title: 'Firmar',
      auth: true,
    }
  },
  {
    path: '/receta',
    name: 'Receta',
    component: () => import(/* webpackChunkName: "Receta" */ '../views/Receta.vue'),
    meta: {
      title: 'Receta',
      auth: true,
    }
  },
  {
    path: '/recuperar',
    name: 'Recuperar',
    component: () => import(/* webpackChunkName: "Recuperar"*/ '../views/auth/RecoverPassword.vue'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/nueva-contrasena',
    name: 'NuevaContrasena',
    component: () => import(/* webpackChunkName: "NuevaContrasena" */ '../views/auth/NewPassword.vue')
  }
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  }*/
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && store.state.auth) next()
  else if(to.meta.auth && !store.state.auth) next('/')
  else if(!to.meta.auth && store.state.auth) next('/nueva-receta')
  else next()
})

export default router
