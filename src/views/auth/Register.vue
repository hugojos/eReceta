<template>
    <div class="row w-100 justify-content-center align-items-center">
        <b-modal 
        id="modal-register" 
        class="rounded" 
        @hidden="$router.push('/iniciar-sesion')"
        hide-header 
        centered>
            <p class="my-3 text-center h4">{{modalMessage}}</p>
            <template v-slot:modal-footer>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 px-0 text-right small">
                            <b-button @click="$router.push('/iniciar-sesion')"
                            variant="success">
                                ¡OK!
                            </b-button>
                        </div>
                    </div>
                </div>
            </template>
        </b-modal>
        <div class="col-12 col-md-8 col-lg-6">
            <form @keypress.enter="validate()" 
            method="POST" class="mt-2 w-100 text-center">
                <div class="form-group text-left w-100">
                    <label for="" class="font-weight-bold">Nombre(s)</label>
                    <form-input :model="medico" :error="error" type="text" name="nombre" placeholder="Ingrese su nombre completo"/>
                </div>
                <div class="form-group text-left">
                    <label for="" class="font-weight-bold">Apellido(s)</label>
                    <form-input :model="medico" :error="error" type="text" name="apellido" placeholder="Ingrese su apellido completo"/>
                </div>
                <div class="form-group row">
                    <div class="col-7 pr-1 text-left">
                        <div class="row">
                            <div class="col-12 form-group">
                                <label for="" class="font-weight-bold">DNI</label>
                                <form-input :model="medico" :error="error" type="number" name="dni" placeholder="Ingrese su DNI"/>
                            </div>
                            <div class="col-12">
                                <label for="" class="font-weight-bold">Teléfono <span class="small text-muted">(opcional)</span></label>  
                                <form-input :model="medico" :error="error" type="number" name="telefono" placeholder="Ingrese su telefono"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 pl-1 text-center">
                        <label for="" class="font-weight-bold">Foto DNI</label>
                        <div v-if="!srcImg">
                            <label for="subir-dni" class="pointer">
                                <font-awesome-icon icon="id-card" class="display-2" />
                            </label>
                            <div v-if="errorImg">
                                <span class="small text-danger">{{errorImg}}</span>
                            </div>
                            <div v-else>
                                <span class="small text-muted">Subir imagen (frontal)</span>
                            </div>
                            <input 
                            @change="addImage($event)"
                            type="file" class="d-none" name="" id="subir-dni">
                        </div>
                        <div v-else 
                        class="position-relative">
                            <img src="/" id="img-salida" class="border w-100" style="height:115px">
                            <font-awesome-icon @click="srcImg = false" icon="trash-alt" class="pointer position-absolute text-danger" style="top:3px; right:3px" title="Eliminar"/>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-7 pr-1 text-left">
                        <label for="" class="font-weight-bold">Nro Matrícula</label>
                        <form-input :model="medico" :error="error" type="text" name="matricula" placeholder="Ingrese su matricula"/>
                    </div>
                    <div class="col-5 p-0 d-flex flex-column justify-content-end align-items-start pl-5">
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
                <div v-if="medico.tipoMatricula == 'PROVINCIAL'"
                class="form-group text-left">
                    <label for="" class="font-weight-bold">Provincia</label>
                    <form-select :model="medico" :error="error" name="idProvincia" :list="listaProvincias" item-value="id" item-name="nombre"/>
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
                matricula: '',
                tipoMatricula: 'NACIONAL',
                password: '',
                confirmPassword: '',
                idProvincia: 0
            },
            error: {},
            loading: false,
            modalMessage : '',
            errorMessage: '',
            srcImg: false,
            errorImg: '',
            listaProvincias: [],
            sinProvincia: []
        }
    },
    computed: {
        generarPDF (){
            return this.$store.state.data
        }
    },
    methods: {
        validate(){
            let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let onlyLetters = /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/
            this.error = {}
            if(this.medico.matricula.length > 7) this.error.matricula = 'La matricula debe contener hasta 7 caracteres'
            if(this.medico.password != this.medico.confirmPassword) this.error.confirmPassword = 'Las contraseñas no coinciden'
            if(!(this.medico.dni.length >= 7 && this.medico.dni.length <= 8)) this.error.dni = 'El DNI debe tener entre 7 y 8 digitos'
            if(!isEmail.test(this.medico.email.toLowerCase())) this.error.email = 'El email es invalido'
            if(this.medico.tipoMatricula == 'PROVINCIAL' && !this.medico.idProvincia) this.error.idProvincia = 'Debe seleccionar una provincia';
            if(this.medico.tipoMatricula == 'NACIONAL') this.medico.idProvincia = this.medico.idProvincia = this.sinProvincia.id
            Object.keys(this.medico).forEach(key => {
                if(!this.medico[key] != '' && key != 'telefono' && key != 'idMedico' && key != 'usaApp' && key != 'idProvincia') 
                    this.$set(this.error, key, 'El campo no debe estar vacio')
                if((key == 'nombre' || key == 'apellido') && !onlyLetters.test(this.medico[key]))
                    this.$set(this.error, key, 'El campo debe contener solo letras') 
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
            })
            .catch(error => {
                console.dir(error)
                this.errorMessage = 'No se pudo continuar con el proceso: ' + error.message;
                if(error.response.data) this.errorMessage = error.response.data
            }).finally(response => { this.loading = false })
        },
        enviarPDF() {
            axios.post('http://'+properties.ip+'/nuevaReceta', this.generarPDF)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/receta')
            })
        },
        addImage(e){
            let file = e.target.files[0]
            let imageType = /image.*/;
            if (!file.type.match(imageType)) {
                this.errorImg = 'Archivo invalido'
                return
            };
            this.errorImg = ''
            let readerShowImg = new FileReader()
            let medico = this.medico;
            let convertDataURIToBinary = this.convertDataURIToBinary;
            readerShowImg.onload = function(e){
                document.getElementById('img-salida').src = e.target.result
                medico.fotoDni = convertDataURIToBinary(e.target.result)
            }
            readerShowImg.readAsDataURL(file);
            this.srcImg = true
        },
        convertDataURIToBinary(dataURI) {
            let base64_maker = ';base64,'
            let base64Index = dataURI.indexOf(base64_maker) + base64_maker.length;
            let base64 = dataURI.substring(base64Index);
            let raw = window.atob(base64);
            let rawLength = raw.length;
            let array = new Array(new ArrayBuffer(rawLength));
            for(let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        },
    },
    mounted(){
        axios.post('http://'+properties.ip+'/provincias')
        .then(response => {
            this.listaProvincias = response.data
            let i = this.listaProvincias.findIndex(element => element.nombre == 'SIN PROVINCIA')
            this.sinProvincia = this.listaProvincias.splice(i,1)[0]
        })
    }
}
</script>