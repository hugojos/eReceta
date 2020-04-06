<template>
    <div class="row w-100 justify-content-center h-75">
        <b-alert show variant="danger" v-show="fail">{{alertMessage}}</b-alert>
        <form 
        v-if="!success"
        @keypress.enter.prevent="validate()"
        action="/" method="POST" class="text-left border col-12 col-md-8 col-lg-8 pt-3">
            <h4 class="text-center">Recuperar contraseña</h4>
            <p class="text-muted small">Por favor, indiquenos su dirrecion de correo electrónico para enviarle el enlace para reestablecer su contraseña.</p>
            <div class="form-group text-left">
                <form-input :model="user" :error="error" type="text" name="email" placeholder="Ingrese su correo electrónico"/>
            </div>
            <div class="form-group text-right mt-2">
                <b-button @click="validate()"
                variant="primary">
                    Enviar
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
        </form>
        <form
        @keypress.enter.prevent="resend()" 
        v-if="success"
        action="/" method="POST" class="text-left border col-12 col-md-8 col-lg-8 pt-3">
            <h4 class="text-center">¡Correo enviado!</h4>
            <p class="text-muted m-0 small">Hemos enviado un enlace al siguiente correo: <span class="font-weight-bold">{{this.user.email.toLowerCase()}}</span>.</p>
            <p class="text-muted small">¡Recuerde revisar su bandeja de correo no deseado!</p>
            <div class="form-group text-right mt-2">
                <div v-if="!resendOK">
                    <span class="small">¿No recibio el correo? </span>
                    <b-button 
                    @click="resend()"
                    variant="primary">
                        Reenviar
                        <b-spinner v-show="loading" 
                        small></b-spinner>
                    </b-button>
                </div>
                <b-button 
                v-if="resendOK"
                @click="resendOK = true"
                variant="success">
                    ¡Reenviado!
                </b-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: {
                email: '',
            },
            error: {},
            loading: false,
            fail: false,
            success: false,
            resendOK: false,
            alertMessage: '',
        }
    },
    methods: {
        validate(){
            this.error = {}
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(this.user.email.toLowerCase()))
                this.error.email = 'El email es invalido'
            Object.keys(this.user).forEach(key => {
                if(!this.user[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.enviar()
        },
        enviar(){
            this.loading = true
            this.success = true
            this.loading = false
            /*axios.post('http://'+properties.ip+'/erp-web/view/recetaCupon/enviar', this.user)
            .then(response => {
            })
            .catch(error => {
                this.error = false
                this.alertMessage = 'No se pudo continuar con el proceso: '+ error.message
            })
            .finally(response => {
                this.loading = false
            })*/
        },
        resend() {
            this.loading = true
            this.resendOK = true
            this.loading = false
        }
    },
}
</script>
