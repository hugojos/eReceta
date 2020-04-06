<template>
    <div class="h-100 w-100 row justify-content-center align-items-center mt-2">
        <b-modal 
        id="modal-center" 
        class="rounded" 
        hide-footer 
        hide-header 
        centered
        variant="danger">
            <div class="d-block text-center">
                <h3>¡La firma no puede estar vacia!</h3>
            </div>
            <b-button class="mt-3" variant="primary" block @click="$bvModal.hide('modal-center')">Cerrar</b-button>
        </b-modal>
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
                    variant="danger"
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
            signature_pad: null,
            loading: false,
        }
    },
    methods: {
        ...mapActions(['updateDataPDF','updateData']),
        validate(){
            if(this.signature_pad.isEmpty()) this.$bvModal.show('modal-center')
            else this.enviar()
        },
        enviar() {
            this.loading = true
            let data = this.$store.state.data;
            data.firmaDigital = this.convertDataURIToBinary( this.signature_pad.toDataURL() )
            axios.post('http://'+properties.ip+'/erp-web/view/eReceta/nuevaReceta', data)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/receta')
            })
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
        let canvas = document.getElementById('canvas')
        this.signature_pad = new SignaturePad(canvas)
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        this.signature_pad.on()
    },
    beforeRouteEnter (to, from, next) {
        if(from.name != 'NuevaReceta') next('/nueva-receta')
        else next()
    }
}
</script>
<style>
    
</style>