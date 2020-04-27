<template>
    <div class="h-100 w-100 row justify-content-center align-items-center mt-2">
        <b-modal 
        id="modal-iniciar-sesion" 
        class="rounded" 
        hide-footer
        centered>
            <template v-slot:modal-title>
                <span class="text-muted">Solo un paso más...</span>
            </template>
            <div class="d-block text-center">
                <h4 class="mb-2">Inicie sesión para continuar</h4>
                <form-login @respuesta="validate()"/>
            </div>
        </b-modal>
        <b-modal 
        id="modal-firma" 
        class="rounded" 
        hide-footer 
        hide-header 
        centered>
            <div class="d-block text-center">
                <h3>¡La firma no puede quedar vacia!</h3>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$bvModal.hide('modal-firma')">Cerrar</b-button>
        </b-modal>
        <b-alert 
        v-if="errorMessage"
        show variant="danger" 
        class="col-12 col-lg-8">
            <span class="small">{{errorMessage}}</span>
        </b-alert>
        <div class="col-12 col-lg-8 justify-content-center mb-1 p-0">
            <h2 class="h3 m-0 font-weight-bold">Firma digital</h2>
            <p class="text-muted mb-1 text-left text-md-center">Por favor, ingrese su firma para confimar la validez de la receta.</p>
        </div>
        <div class="col-12 col-lg-8 p-0" id="canvas_container_firma">
            <canvas id="canvas" class="border w-100 h-100">Su navegador no soporta canvas :( </canvas>
        </div>
        <div class="col-12 col-lg-8 align-items-center mb-1 mt-2">
            <div class="row">
                <div class="col-6 pl-0 text-left">
                    <b-button @click="signature_pad.clear()"
                    variant="outline-danger"
                    class="mr-2">
                        Limpiar
                    </b-button>
                </div>
                <div class="col-6 px-0 text-right small">
                    <b-button @click="validate()"
                    variant="primary">
                        Generar receta
                        <b-spinner v-show="loading" 
                        small></b-spinner>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            user: {
                email:'',
                password:''
            },
            error: {},
            signature_pad: null,
            loading: false,
            errorMessage: ''
        }
    },
    computed: {
        generarPDF (){
            return this.$store.state.data
        }
    },
    methods: {
        ...mapActions(['updateDataPDF','updateData']),
        validate(){
            this.generarPDF.firmaDigital = this.convertDataURIToBinary( this.signature_pad.toDataURL() )
            if(this.signature_pad.isEmpty()) this.$bvModal.show('modal-firma')
            else if(!this.$store.state.auth) this.$bvModal.show('modal-iniciar-sesion')
            else {
                this.$bvModal.hide('modal-iniciar-sesion')
                this.enviar()
            }
        },
        enviar() {
            console.log(this.generarPDF)
            this.loading = true
            axios.post('http://'+properties.ip+'/nuevaReceta', this.generarPDF)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/receta')
                console.log(response)
            })
            .catch(error => this.errorMessage = 'No se pudo continuar con el proceso: '+ error.message)
            .finally(() => this.loading = false)
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
    mounted() {
        if(!Object.keys(this.$store.state.data).length) this.$router.push('/nueva-receta')
        let canvas = document.getElementById('canvas')
        this.signature_pad = new SignaturePad(canvas)
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        this.signature_pad.on()
    },
}
</script>