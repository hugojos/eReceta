<template>
    <div class="w-100 row justify-content-center align-items-center">
        <b-modal id="modal-register" body-bg-variant="success" class="rounded" hide-footer hide-header centered>
            <p class="my-3 text-center h4 text-white">{{modalMessage}}</p>
        </b-modal>
        <form @keypress.enter="validate()" 
        action="" method="POST" class="rounded mt-2 col-12 col-md-8 col-lg-6 text-center">
            <div class="form-group text-left">
                <label for="" class="font-weight-bold">Nombre(s)</label>
                <form-input :model="medico" :error="error" type="text" name="nombre" placeholder="Ingrese su nombre completo"/>
            </div>
            <div class="form-group text-left">
                <label for="" class="font-weight-bold">Apellido(s)</label>
                <form-input :model="medico" :error="error" type="text" name="apellido" placeholder="Ingrese su apellido completo"/>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="" class="font-weight-bold">DNI <span class="small text-muted">(opcional)</span> </label>
                    <form-input :model="medico" :error="error" type="number" name="dni" placeholder="Ingrese su DNI"/>
                </div>
                <div class="col-6 pl-1 text-left">
                    <label for="" class="font-weight-bold">Telefono <span class="small text-muted">(opcional)</span></label>  
                    <form-input :model="medico" :error="error" type="number" name="telefono" placeholder="Ingrese su telefono"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="" class="font-weight-bold">Nro Matricula</label>
                    <form-input :model="medico" :error="error" type="text" name="matricula" placeholder="Ingrese su matricula"/>
                </div>
                <div class="col-6 p-0 d-flex flex-column justify-content-end pl-5 text-left">
                    <div class="custom-control custom-radio">
                        <input v-model="medico.tipoMatricula"
                        type="radio" name="tipo" value="NACIONAL" id="nacional" class="custom-control-input">
                        <label class="custom-control-label" for="nacional">Nacional</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input v-model="medico.tipoMatricula"
                        type="radio" name="tipo" value="PROVINCIAL" id="provincial" class="custom-control-input">
                        <label class="custom-control-label" for="provincial">Provincial</label>
                    </div>
                </div>
            </div>
            <div class="form-group text-left">
                <label for="" class="font-weight-bold">Email</label>
                <form-input :model="medico" :error="error" type="text" name="email" placeholder="Ingrese su correo electrónico"/>
            </div>
            <div class="form-group text-left">
                <label for="" class="font-weight-bold">Contraseña</label>
                <form-input :model="medico" :error="error" type="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>
            <div class="form-group text-left">
                <label for="" class="font-weight-bold">Confirmar contraseña</label>
                <form-input :model="medico" :error="error" type="password" name="confirmPassword" placeholder="Confirme su contraseña"/>
            </div>
            <span v-if="errorMessage"
            class="d-block mb-2 text-danger">{{errorMessage}}</span>
            <div class="form-group mb-2">
                <b-button @click="validate()"
                variant="primary">
                    Registrarse
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            medico: {
                nombre: '',
                apellido: '',
                dni: '',
                telefono: '',
                email: '',
                matricula: '',
                tipoMatricula: 'NACIONAL',
                password: '',
                confirmPassword: ''
            },
            error: {},
            loading: false,
            modalMessage : '',
            errorMessage: ''
        }
    },
    methods: {
        ...mapActions(['updateAuth']),
        validate(){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.error = {}
            if(this.medico.matricula.length > 7) this.error.matricula = 'La matricula debe contener hasta 7 caracteres'
            if(this.medico.password != this.medico.confirmPassword) this.error.confirmPassword = 'Las contraseñas no coinciden'
            if(this.medico.dni.length  && !(this.medico.dni.length >= 7 && this.medico.dni.length <= 8)) this.error.dni = 'El DNI debe tener entre 7 y 8 digitos'
            if(!re.test(this.medico.email.toLowerCase())) this.error.email = 'El email es invalido'
            Object.keys(this.medico).forEach(key => {
                if(!this.medico[key] && key != 'telefono' && key != 'dni') this.$set(this.error, key, 'El campo no debe estar vacio') 
            });
            if(!Object.keys(this.error).length)
                this.register()
        },
        register(){
            this.loading = true
            this.medico.idMedico = 0
            this.medico.usaApp = false
            axios.post('http://'+properties.ip+'/registrar', this.medico)
            .then(response => {
                this.modalMessage = response.data;
                this.$bvModal.show('modal-register')
                localStorage.setItem('auth', JSON.stringify(this.medico))
                this.updateAuth(this.medico)
                setTimeout(() => {
                    this.$router.push('/nueva-receta')
                }, 2000)
            })
            .catch(error => {
                console.dir(error)
                this.errorMessage = 'No se pudo continuar con el proceso: ' + error.message;
                if(error.response.data) this.errorMessage = error.response.data
            })
            .finally(response => {
                this.loading = false
            })
        }
    },
    mounted(){
        if(this.$store.state.auth) this.$router.push('nueva-receta')
    }
}
</script>