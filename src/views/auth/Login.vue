<template>
    <div class="h-100 row justify-content-center align-items-center">
        <form @submit="validate()" 
        action="" method="POST" class="mt-5 col-11 col-md-6 col-lg-4 text-center">
            <div class="row justify-content-center">
                <img src="img/eReceta.jpg" class="col-10 col-md-12 mb-5" alt="">
            </div>
            <b-alert show variant="danger" v-show="!status">{{alertMessage}}</b-alert>
            <div class="form-group text-left">
                <label for="email">Usuario</label>
                <form-input :model="user" :error="error.email" type="text" name="email" placeholder="Ingrese su usuario"/>
            </div>
            <div class="form-group text-left mb-2">
                <label for="password">Contraseña</label>
                <div class="position-relative">
                    <form-input :model="user" :error="error.password" :type="showPassword ? 'text':'password'" name="password" placeholder="Ingrese su contraseña"/>
                    <font-awesome-icon @click="showPassword = !showPassword" :icon="showPassword ? 'eye-slash': 'eye'" class="position-absolute pointer" style="right:-25px; top:12px;"/>
                </div>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center">
                <input v-model="recordarme"
                type="checkbox" class="custom-control-input" id="customCheck" name="example1">
                <label class="custom-control-label" for="customCheck">Recordarme</label>
            </div>
            <div class="form-group mt-2">
                <b-button @click="validate()"
                variant="primary">
                    Acceder
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
            <div class="form-group d-flex flex-column">
                <router-link to="/registrar-medico">Registrarse</router-link>
                <a href="">Recuperar contraseña</a>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            user: {
                email: '',
                password: '',
            },
            error: {},
            showPassword: false,
            loading: false,
            status: true,
            alertMessage: '',
            recordarme: false
        }
    },
    methods: {
        ...mapActions(['updateAuth']),
        validate(){
            this.error = {}
            Object.keys(this.user).forEach(key => {
                if(!this.user[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.login()
        },
        login(){
            this.loading = true
            axios.post('http://190.19.60.31:5004/erp-web/view/recetaCupon/login', this.user)
            .then(response => {
                console.log(response)
                if(this.recordarme) 
                    localStorage.setItem('auth', JSON.stringify(response.data))
                this.updateAuth(response.data)
                this.$router.push('/nuevo-cupon')
            })
            .catch(error => {
                this.status = false
                if(error.response && error.response.status == 401)
                    this.alertMessage = '¡Usuario y/o contraseña incorrecto!'
                else 
                    this.alertMessage = error.message
            })
            .finally(response => {
                this.loading = false
            })
        }
    },
}
</script>
