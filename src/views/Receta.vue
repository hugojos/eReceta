<template>
    <div class="h-100 w-100 row justify-content-center align-items-center mt-2">
        <b-modal 
        id="modal-enviar-correo" 
        class="rounded" 
        centered>
            <template v-slot:modal-title>
                <span class="text-muted">Enviar por correo electrónico</span>
            </template>
            <div class="text-left">
                <b-alert class="form-group text-center" show variant="success" v-show="okResponse">
                    <span class="small">{{okResponse}} </span>
                </b-alert>
                <b-alert class="form-group text-center" show variant="danger" v-show="errorResponse">
                    <span class="small">{{errorResponse}} </span>
                </b-alert>
                <span class="font-weight-bold">Ingrese email del paciente</span>
                <form-input :model="correo" :error="error" name="email" type="email" placeholder="example@email.com" class="mt-2" />
            </div>
            <template v-slot:modal-footer>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6 pl-0 text-left">
                            <b-button @click="$bvModal.hide('modal-enviar-correo')"
                            variant="outline-danger"
                            class="mr-2">
                                Cancelar
                            </b-button>
                        </div>
                        <div class="col-6 px-0 text-right small">
                            <b-button @click="validate()"
                            variant="success">
                                Enviar
                                <b-spinner v-show="loading" 
                                small></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </div>
            </template>
        </b-modal>
        <div class="col-12 col-lg-8 align-items-center mb-1">
            <div class="row">
                <div 
                @click="$router.push('/nueva-receta')"
                class="col-6 text-left p-0">
                    <b-button variant="primary">
                        Nueva receta
                    </b-button>
                </div>
                <div class="col-3">
                </div>
                <div class="col-3 p-0 d-flex pointer align-items-center justify-content-end">
                    <b-dropdown id="dropdown-right" right text="Compartir" variant="primary" class="">
                        <b-dropdown-item @click="download()"
                        href="#" class="p-0">
                            <div class="d-flex align-items-center justify-content-between">
                                <span>
                                    Descargar
                                </span>
                            </div>
                        </b-dropdown-item>
                        <b-dropdown-item @click="$bvModal.show('modal-enviar-correo')"
                        href="#" class="p-0">
                            <div class="d-flex align-items-center justify-content-between">
                                <span>
                                    Enviar por correo
                                </span>
                            </div>
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
        <div class="w-100 col-12 col-lg-8 p-0" id="my_pdf_viewer">
            <div class="border border-dark overflow-hidden" id="canvas_container">
                <canvas class="" id="pdf_renderer"></canvas>
            </div>
        </div>
        <div class="col-12 col-lg-8 p-0 my-3">
            <div class="row">
                <div class="col-4 text-left">
                    <b-button @click="changePage(-1)"
                    :disabled="state.currentPage == 1"
                    variant="primary">
                        Anterior
                    </b-button>
                </div>
                <div class="col-4 align-items-center d-flex justify-content-center">
                    <span class="font-weight-bold">Página {{state.currentPage}} / {{totalPages}} </span>
                </div>
                <div class="col-4 text-right">
                    <b-button @click="changePage(1)"
                    :disabled="state.currentPage == totalPages"
                    variant="primary">
                        Siguiente
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            state: {
                pdf: null,
                currentPage: 1,
                zoom: 1
            },
            correo: {
                nombre: '',
                archivo: '',
                email: ''
            },
            okResponse: '',
            errorResponse: '',
            error: {},
            loading: false
        }
    },
    computed: {
        totalPages(){
            return this.state.pdf ? this.state.pdf._pdfInfo.numPages : 1;
        }
    },
    methods: {
        validate(){
            this.error = {}
            let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(!isEmail.test(this.correo.email.toLowerCase())) this.$set(this.error, 'email', 'El correo es invalido')
            if(!this.correo.email) this.$set(this.error, 'email', 'El correo no debe estar vacio')
            if(!Object.keys(this.error).length)
                this.enviarCorreo()
        },
        enviarCorreo(){
            console.log(this.correo)
            this.loading = true
            axios.post('http://'+properties.ip+'/enviarPDF', this.correo)
            .then(response => {
                console.log(response)
                this.correo.email = ''
                this.errorResponse = ''
                this.okResponse = response.data
            })
            .catch(error => {
                console.dir(error)
                this.okResponse = ''
                this.errorResponse = 'No se pudo continuar con el proceso: ' +error.message
            })
            .finally(() => this.loading = false)
        },
        changePage(value){
            let aux = this.state.currentPage + value;
            if(aux > 0 && aux <= this.totalPages){
                this.state.currentPage = aux;
                this.render()
            }
        },
        download(){
            let data = Uint8Array.from(atob(this.$store.state.dataPDF.archivo), c => c.charCodeAt(0));
            let blob = new Blob([data], {type: "octet/stream"});
            let link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download="Receta.pdf";
            link.click();
        },
        render() {
            this.state.pdf.getPage(this.state.currentPage).then((page) => {
                let canvas = document.getElementById("pdf_renderer");
                let ctx = canvas.getContext('2d');
                let container = document.getElementById('my_pdf_viewer')
                let viewport = page.getViewport({scale: (container.offsetWidth / page.getViewport({scale:1.0}).width)});
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({
                    canvasContext: ctx,
                    viewport: viewport
                });
            });
        }
    },
    mounted(){
        this.correo.nombre = this.$store.state.dataPDF.nombre
        this.correo.archivo = this.$store.state.dataPDF.archivo
        const loadPDF = pdfjsLib.getDocument({data: atob(this.$store.state.dataPDF.archivo)}).promise.then(pdf => {
            this.state.pdf = pdf;
            this.render()
        })
    },
}
</script>
<style>
    #canvas_container {
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: auto;
    }
</style>