import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import NuevoCupon from '../views/NuevoCupon.vue'
import Cupon from '../views/Cupon.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Iniciar sesión'
    }
  },
  {
    path: '/registrar-medico',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Registrar medico'
    }
  },
  {
    path: '/nuevo-cupon',
    name: 'NuevoCupon',
    component: NuevoCupon,
    meta: {
      title: 'Nuevo Cupon'
    }
  },
  {
    path: '/cupon',
    name: 'Cupon',
    component: Cupon,
    meta: {
      title: 'Cupon'
    }
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
  if ((to.name != 'Login' || to.name == 'Register') && !Object.keys(store.state.auth).length) next({ name: 'Login' })
  if ((to.name == 'Login' || to.name == 'Register') && Object.keys(store.state.auth).length) next('/nuevo-cupon')
  else next()
})

export default router
