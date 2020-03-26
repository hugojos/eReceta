<template>
    <header class="text-white d-flex align-items-center justify-content-center position-relative">
        <font-awesome-icon @click="$router.back()" v-if="$route.name == 'Cupon'"
        icon="arrow-circle-left" class="h5 m-0 position-absolute" title="Atras" style="left: 20px"/>
        <h1 class="h5 m-0">{{this.$route.meta.title}}</h1>
        <font-awesome-icon @click="logout()" v-if="$route.name != 'Login' && $route.name != 'Register'"
        icon="sign-out-alt" class="h4 m-0 position-absolute" title="Cerrar sesión" style="right: 20px"/>
    </header>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['updateAuth']),
        logout(){
            this.updateAuth({})
            this.$router.push('/')
        },
        
    },
    mounted(){
    }
}
</script>
<style>
    header {
        background-color: #6200ed;
    }
    .h4 {
        cursor: pointer;
    }
</style>