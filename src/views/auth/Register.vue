<template>
    <div class="h-100 row justify-content-center align-items-center">
        <b-modal id="modal-center" class="rounded" hide-footer hide-header centered>
            <p class="my-3 text-center h4 text-white">{{modalMessage}}</p>
        </b-modal>
        <form @submit="validate()" 
        action="" method="POST" class="mt-2 col-12 col-md-8 col-lg-6 text-center">
            <div class="form-group text-left">
                <label for="">Nombres</label>
                <form-input :model="medico" :error="error.nombre" type="text" name="nombre" placeholder="Ingrese su nombre completo"/>
            </div>
            <div class="form-group text-left">
                <label for="">Apellidos</label>
                <form-input :model="medico" :error="error.apellido" type="text" name="apellido" placeholder="Ingrese su apellido completo"/>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">DNI</label>
                    <form-input :model="medico" :error="error.dni" type="text" name="dni" placeholder="Ingrese su DNI"/>
                </div>
                <div class="col-6 pl-1 text-left">
                    <label for="">Telefono</label>  
                    <form-input :model="medico" :error="error.telefono" type="text" name="telefono" placeholder="Ingrese su telefono"/>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">Nro Matricula</label>
                    <form-input :model="medico" :error="error.matricula" type="text" name="matricula" placeholder="Ingrese su numero de matricula"/>
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
            <div class="form-group row">
                <div class="col-12 pr-1 text-left">
                    <label for="">Email</label>
                    <form-input :model="medico" :error="error.email" type="text" name="email" placeholder="Ingrese su correo electrónico"/>
                </div>
            </div>
            <div class="form-group text-left">
                <label for="">Contraseña</label>
                <form-input :model="medico" :error="error.password" type="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>
            <div class="form-group text-left">
                <label for="">Confirmar contraseña</label>
                <form-input :model="medico" :error="error.confirmPassword" type="password" name="confirmPassword" placeholder="Confirme su contraseña"/>
            </div>
            <span v-if="!status"
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
            status: true,
            modalMessage : '',
            errorMessage: ''
        }
    },
    methods: {
        ...mapActions(['updateAuth']),
        validate(){
            this.error = {}
            if(this.medico.matricula.length != 6)
                this.error.matricula = '¡La matricula debe ser 6 digitos!'
            if(this.medico.password != this.medico.confirmPassword)
                this.error.confirmPassword = '¡Las contraseñas no coinciden!'
            Object.keys(this.medico).forEach(key => {
                if(!this.medico[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!') 
            });
            if(!Object.keys(this.error).length)
                this.register()
            console.log(this.medico)
        },
        register(){
            this.loading = true
            this.medico.idMedico = '0'
            this.medico.usaApp = '0'
            axios.post('http://190.19.60.31:5004/erp-web/view/recetaCupon/registrar', this.medico)
            .then(response => {
                this.modalMessage = response.data;
                this.$bvModal.show('modal-center')
                localStorage.setItem('auth', JSON.stringify(this.medico))
                this.updateAuth(this.medico)
                setTimeout(() => {
                    this.$router.push('/nuevo-cupon')
                }, 2000)
            })
            .catch(error => {
                this.status = false
                this.errorMessage = error.message;
                if(error.response) this.errorMessage += '('+error.response.statusText+')'
            })
            .finally(response => {
                this.loading = false
            })
        }
    }
}
</script>
<style>
    label {
        margin: 0!important;
    }
    .errorIcon {
        right: 5px;
        top: 10px;
    }
    .modal-body {
        background-color: #6200ed;
    }
</style>