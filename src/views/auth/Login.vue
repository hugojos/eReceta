<template>
    <div class="h-100 row justify-content-center align-items-center">
        <form @submit="validate()" 
        action="" method="POST" class="mt-5 col-11 col-md-6 col-lg-4 text-center">
            <b-alert show variant="danger" v-show="!status">{{alertMessage}}</b-alert>
            <div class="form-group text-left">
                <label for="email">Usuario</label>
                <form-input :model="user" :error="error.email" type="text" name="email" />
            </div>
            <div class="form-group text-left">
                <label for="password">Contraseña</label>
                <div class="position-relative">
                    <form-input :model="user" :error="error.password" :type="showPassword ? 'text':'password'" name="password" />
                    <font-awesome-icon @click="showPassword = !showPassword" :icon="showPassword ? 'eye-slash': 'eye'" class="position-absolute pointer" style="right:-25px; top:12px;"/>
                </div>
            </div>
            <div class="form-group mt-4">
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
                password: ''
            },
            error: {},
            showPassword: false,
            loading: false,
            status: true,
            alertMessage: ''
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
            console.log(this.user)
            axios.post('http://190.221.61.114:5004/erp-web/view/recetaCupon/login', this.user)
            .then(response => {
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
    }
}
</script>
