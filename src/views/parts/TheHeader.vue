<template>
    <header class="py-1 bg-purpura text-white d-flex align-items-center justify-content-center position-relative">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <img src="img/1.jpg" style="width:23px" alt=""> 
                </div> 
                <div class="col-8">
                    <h1 class="h5 m-0">{{this.$route.meta.title}}</h1>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <font-awesome-icon @click="logout()" v-if="$route.name != 'Login' && $route.name != 'Register'"
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
            this.updateAuth({})
            localStorage.removeItem('auth')
            this.$router.push('/')
        },
        
    },
    mounted(){
    }
}
</script>