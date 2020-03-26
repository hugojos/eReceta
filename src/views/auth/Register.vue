<template>
    <div class="h-100 row justify-content-center align-items-center">
        <b-modal id="modal-center" class="rounded" hide-footer hide-header centered>
            <p class="my-3 text-center h3 text-white">¡Usuario creado con éxito!</p>
        </b-modal>
        <form @submit="validate()" 
        action="" method="POST" class="mt-2 col-12 col-md-8 col-lg-6 text-center">
            <div class="form-group text-left">
                <label for="">Nombres</label>
                <form-input :model="medico" :error="error.nombre" type="text" name="nombre" />
            </div>
            <div class="form-group text-left">
                <label for="">Apellidos</label>
                <form-input :model="medico" :error="error.apellido" type="text" name="apellido" />
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">DNI</label>
                    <form-input :model="medico" :error="error.dni" type="text" name="dni" />
                </div>
                <div class="col-6 pl-1 text-left">
                    <label for="">Telefono</label>  
                    <form-input :model="medico" :error="error.telefono" type="text" name="telefono" />
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">Email</label>
                    <form-input :model="medico" :error="error.email" type="text" name="email" />
                </div>
                <div class="col-1 align-items-end d-flex justify-content-center">
                    <span class="h4 text-muted">@</span>
                </div>
                <div class="col-5 align-items-end d-flex pl-1 text-left">
                    <select v-model="medico.servidor"
                    class="pl-1 form-control" name="">
                        <option value="">Seleccionar</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hotmail.com">hotmail.com</option>
                        <option value="yahoo.com">yahoo.com.ar</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">Nro Matricula</label>
                    <form-input :model="medico" :error="error.matricula" type="text" name="matricula" />
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
                <label for="">Contraseña</label>
                <form-input :model="medico" :error="error.password" type="password" name="password" />
            </div>
            <div class="form-group text-left">
                <label for="">Confirmar contraseña</label>
                <form-input :model="medico" :error="error.confirmPassword" type="password" name="confirmPassword" />
            </div>
            <div class="form-group mb-2">
                <b-button @click="validate()"
                variant="primary">
                    Registrarse
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
            <span v-if="!status"
            class="d-block mb-2 text-danger">¡Ya existe un medico registrado con esa matricula!</span>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            medico: {
                nombre: '',
                apellido: '',
                dni: '',
                telefono: '',
                email: '',
                servidor: '',
                matricula: '',
                tipoMatricula: 'NACIONAL',
                password: '',
                confirmPassword: ''
            },
            error: {},
            loading: false,
            status: true
        }
    },
    methods: {
        validate(){
            this.error = {}
            if(!this.medico.servidor)
                this.error.email = '¡Debe seleccionar un servidor!'
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
            this.medico.email += '@'+this.medico.servidor
            console.log(this.medico)
            axios.post('http://190.221.61.114:5004/erp-web/view/recetaCupon/registrar', this.medico)
            .then(response => {
                console.log(response)
                if(response.status == 201) {
                    this.$bvModal.show('modal-center')
                    setTimeout(() => {
                        this.$router.push('/nuevo-cupon')
                    }, 2000)
                } else 
                    this.status = false
            })
            .catch(error => {
                console.log(error)
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