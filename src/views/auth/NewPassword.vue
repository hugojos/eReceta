<template>
    <div class="row w-100 justify-content-center h-75">
        <b-modal id="modal-new-password" body-bg-variant="success" class="rounded" hide-footer hide-header centered>
            <p class="my-3 text-center h4 text-white">{{modalMessage}}</p>
        </b-modal>
        <form @keypress.enter="validate()" 
        action="/" method="POST" class="border pt-3 col-12 col-md-8 col-lg-8 text-center">
            <h4 class="mb-3">Escriba su nueva contraseña</h4>
            <div class="form-group text-left">
                <label for="email">Contraseña</label>
                <form-input :model="user" :error="error" type="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>
            <div class="form-group text-left mb-2">
                <label for="password">Confirme contraseña</label>
                <form-input :model="user" :error="error" type="password" name="confirmPassword" placeholder="Confirme su contraseña"/>
            </div>
            <div class="form-group mt-3 row flex-column align-items-center">
                <span class="text-danger col-12 p-0 mb-2" v-if="errorMessage">{{errorMessage}}</span>
                <b-button @click="validate()"
                variant="primary"
                :disabled="errorMessage ? true : false"
                :class="['col-6', {'disabled': errorMessage}]">
                    Reestablecer
                    <b-spinner v-show="loading" 
                    small></b-spinner>
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
                password: '',
                confirmPassword: '',
            },
            error: {},
            loading: false,
            alertMessage: '',
            token: this.$route.query.token,
            medico: {},
            modalMessage: '',
            errorMessage: ''
        }
    },
    methods: {
        validate(){
            this.error = {}
            if(this.user.password != this.user.confirmPassword)
                this.error.confirmPassword = 'Las contraseñas no coinciden'
            Object.keys(this.user).forEach(key => {
                if(!this.user[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.enviar()
        },
        enviar(){
            this.medico.password = this.user.password
            axios.post('http://'+properties.ip+'/recuperar-contrasena/cambiar-contrasena', this.medico)
            .then(response => {
                console.log(response)
                this.modalMessage = response.data;
                this.$bvModal.show('modal-new-password')
                setTimeout(() => this.$router.push('/iniciar-sesion'), 2000)
                
            })
            .catch(error => {
                this.errorMessage = 'No se pudo continuar con el proceso: ' + error.message;
                if(error.response.data) this.errorMessage = error.response.data
            })
        }
    },
    mounted(){
        console.log(this.token)
        axios.get('http://'+properties.ip+'/recuperar-contrasena/verificar?tokenRecibido='+this.token)
        .then(response => {
            console.log(response)
            this.medico = response.data
        })
        .catch(error => {
            this.errorMessage = 'No se pudo continuar con el proceso: ' + error.message;
            if(error.response.data) this.errorMessage = error.response.data
        })
    }
}
</script>
