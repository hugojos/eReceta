<template>
    <header class="py-1 bg-purpura text-white d-flex align-items-center justify-content-center position-absolute w-100" style="top:0">
        <div class="container">
            <div class="row">
                <div class="col-2 d-flex justify-content-start align-items-center">
                    <font-awesome-icon @click="toggleMenu()" v-if="$route.name != 'Login' && $route.name != 'Register' && $route.name != 'Recuperar' && $route.name != 'NuevaContrasena'"
                    icon="bars" class="pointer h3 m-0 float-right pointer" />
                </div> 
                <div class="col-8">
                </div>
                <div class="col-2 d-flex justify-content-end align-items-center">
                    <img src="img/1.jpg" style="width:27px" alt="">
                </div>
            </div>
        </div>
        <nav class="container-fluid position-absolute">
            <div class="row">
                <div :style="[$route.query.menu ? {left:0}  : styleMenu]"
                class="menu position-absolute col-xl-3 col-lg-4 col-sm-6 col-11 bg-purpura vh-100 p-0">
                    <div class="w-100 border-bottom row m-0 align-items-center">
                        <div class="col-12">
                            <div class="row align-items-center" style="min-height: 36px">
                                <div class="col-10 text-left">
                                    <span class="font-weight-bold h4 m-0">{{$store.state.auth.nombre || 'Anonimo'}}</span>
                                </div>
                                <div @click="toggleUserMenu = !toggleUserMenu"
                                class="col-2 d-flex justify-content-end align-items-center">
                                    <font-awesome-icon icon="angle-down" class="pointer h3 m-0" :rotation="toggleUserMenu ? 180 : null"  style="transition: all .3s"/> 
                                </div>
                            </div>
                        </div>
                        <div class="col-12" :style="[toggleUserMenu ? '' : {height: 0},{backgroundColor:'#461093', overflow: 'hidden',transition: 'all .3s'}]">
                            <ul class="list-unstyled pb-2 pl-4 m-0">
                                <li class="row mt-2">
                                    <div class="col-2 text-center pr-0">
                                        <font-awesome-icon class="h5 m-0" icon="user" />
                                    </div>
                                    <div class="col-10 text-left pl-1">
                                        <span>Mis datos</span>
                                    </div>
                                </li>
                                <li @click="logout()"
                                class="row mt-2 pointer">
                                    <div class="col-2 text-center pr-0">
                                        <font-awesome-icon class="h5 m-0" icon="sign-out-alt" />
                                    </div>
                                    <div class="col-10 text-left pl-1">
                                        <span>Cerrar sesión</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul class="text-left pl-4 pt-3 list-unstyled">
                        <li class="row mt-2">
                            <div class="col-2 text-center pr-0">
                                <font-awesome-icon class="h4 m-0" icon="notes-medical" />
                            </div>
                            <div class="col-10 d-flex align-items-center text-left pl-0">
                                <router-link to="/nueva-receta" class="h5 text-light m-0 text-decoration-none">Generar receta</router-link>
                            </div>
                        </li>
                        <!--<li class="row mt-2">
                            <div class="col-2 text-center pr-0">
                                <font-awesome-icon class="h4 m-0" icon="prescription-bottle" />
                            </div>
                            <div class="col-10 d-flex align-items-center text-left pl-0">
                                <span class="h5">Generar farmaco</span>
                            </div>
                        </li>-->
                    </ul>
                </div>
                <div @click="toggleMenu()" v-if="$route.query.menu"
                class="position-absolute container-fluid fondo-oscuro bg-dark vh-100" style="top:0">
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            styleMenu: {
                left: '-100%',
            },
            styleArrow: {
                transform: 'rotate(180deg)',
            },
            toggle: false,
            toggleUserMenu: false
        }
    },
    methods: {
        ...mapActions(['updateAuth']),
        toggleMenu(){
            if(this.$route.query.menu) this.$router.push({query: {menu: undefined}})
            else this.$router.push({query: {menu: true}})
         
        },
        logout(){
            this.updateAuth(false)
            localStorage.removeItem('auth')
            this.$router.push('/')
        },
    },
}
</script>
<style>
    header {
        height: 36px;
    }
    nav {
        top: 0;
        z-index: 1;
    }
    .menu {
        z-index: 2;
        transition: all 0.4s;
    }
    .fondo-oscuro {
       opacity: 0.5;
    }
</style>