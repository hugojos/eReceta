<template>
    <header class="py-1 bg-purpura text-white d-flex align-items-center justify-content-center position-absolute w-100" style="top:0">
        <div class="container">
            <div class="row">
                <div @click="$router.push('/')"
                class="pointer col-2 d-flex justify-content-start align-items-center">
                    <img src="img/1.jpg" style="width:23px" alt=""> 
                </div> 
                <div class="col-8">
                    <!--<h1 class="h4 m-0">{{this.$route.meta.title}}</h1>-->
                </div>
                <div class="col-2 d-flex justify-content-end align-items-center">
                    <font-awesome-icon @click="logout()" v-if="$route.name != 'Login' && $route.name != 'Register' && $route.name != 'Recuperar' && $route.name != 'NuevaContrasena'"
                    icon="sign-out-alt" class="h4 m-0 float-right pointer" title="Cerrar sesión"/>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['updateAuth']),
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
</style>