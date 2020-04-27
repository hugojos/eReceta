<template>
    <form @keypress.enter="validate()" action="" class="text-left">
        <div class="row justify-content-center">
            <b-alert class="col-11 form-group text-center" show variant="danger" v-show="alertMessage">
                <span class="small">{{alertMessage}}</span>
            </b-alert>
            <div class="col-11 form-group">
                <label for="" class="font-weight-bold">Email</label>
                <form-input :model="user" type="text" name="email" placeholder="Ingrese su email" :error="error"/>
            </div>
            <div class="col-11 form-group">
                <label for="" class="font-weight-bold">Contraseña</label>
                <div class="position-relative">
                    <form-input :model="user" :error="error" :type="showPassword ? 'text':'password'" name="password" placeholder="Ingrese su contraseña"/>
                    <font-awesome-icon @click="showPassword = !showPassword" :icon="showPassword ? 'eye-slash': 'eye'" class="position-absolute pointer" style="right:-25px; top:12px;"/>
                </div>
                <router-link to="/recuperar" class="small">Olvidé mi contraseña</router-link>
            </div>
            <div class="col-12 form-group text-center">
                <b-button @click="validate()"
                variant="primary">
                    Acceder
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
            <div class="col-12 text-center">
                <span class="small text-muted">¿No tienes cuenta? <router-link to="/registrarse">Registrarse</router-link> </span>
            </div>
        </div>
    </form>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data () {
        return {
            user: {
                email:'',
                password:''
            },
            error: {},
            loading: false,
            alertMessage: '',
            showPassword: false
        }
    },
    props: {
        response: Object
    },
    methods:{
        ...mapActions(['updateAuth']),
        validate(){
            this.error = {}
            Object.keys(this.user).forEach(key => {
                if(!this.user[key]) this.$set(this.error, key, 'El campo no debe estar vacio')
            })
            if(!Object.keys(this.error).length) this.login()
        },
        login(){
            this.loading = true
            axios.post('http://'+properties.ip+'/login', this.user)
            .then(response => {
                console.log(response)
                this.updateAuth(response.data)
                this.$emit('respuesta')
            })
            .catch(error => {
                console.dir(error)
                if(error.response && error.response.status == '404') this.alertMessage = '¡Usuario y/o contraseña incorrecto!'
                else if(error.response && error.response.status == '401') this.alertMessage = 'El usuario aún no ha sido validado con el mail que se le ha enviado'
                else this.alertMessage = 'No se pudo continuar con el proceso: '+ error.message
                this.$emit('respuesta')
            })
            .finally(() => this.loading = false)
        }
    }
}
</script>