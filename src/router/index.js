import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './middleware/auth'
import Guest from './middleware/guest'
import DataPDF from './middleware/dataPDF'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/iniciar-sesion',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */  '../views/auth/Login.vue'),
    meta: {
      title: 'Iniciar sesión',
      middleware: Guest
    }
  },
  {
    path: '/registrarse',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/auth/Register.vue'),
    meta: {
      title: 'Registrar medico',
      middleware: Guest
    }
  },
  {
    path: '/nueva-receta',
    name: 'NuevaReceta',
    component: () => import(/* webpackChunkName: "NuevaReceta" */ '../views/NuevaReceta.vue'),
    meta: {
      title: 'Nuevo receta',
    }
  },
  {
    path: '/firmar',
    name: 'Firmar',
    component: () => import(/* webpackChunkName: "NuevaReceta" */ '../views/Firmar.vue'),
    meta: {
      title: 'Firmar',
    }
  },
  {
    path: '/receta',
    name: 'Receta',
    component: () => import(/* webpackChunkName: "Receta" */ '../views/Receta.vue'),
    meta: {
      middleware: DataPDF
    },
  },
  {
    path: '/recuperar',
    name: 'Recuperar',
    component: () => import(/* webpackChunkName: "Recuperar"*/ '../views/auth/RecoverPassword.vue'),
    meta: {
      middleware: Guest
    }
  },
  {
    path: '/nueva-contrasena',
    name: 'NuevaContrasena',
    component: () => import(/* webpackChunkName: "NuevaContrasena" */ '../views/auth/NewPassword.vue'),
    meta: {
      middleware: Guest
    }
  },
  {
    path: '/validar',
    name: 'ValidarEmail',
    component: () => import(/* webpackChunkName: "ValidarEmail"*/ '../views/auth/EmailValidation.vue'),
  },
  {
    path: '*',
    redirect: {name: 'NuevaReceta'}
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const context = {
    to,
    from,
    next,
    router,
    store
  }
  if(to.meta.middleware) to.meta.middleware({...context})
  else next()
})

export default router
