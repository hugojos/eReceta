<template>
    <div class="h-100 w-100 row justify-content-center align-items-center mt-2">
        <div class="col-12 col-lg-8 row align-items-center mb-1">
            <div @click="$router.push('/nueva-receta')"
            class="col-3 p-0 d-flex pointer align-items-center justify-content-start">
                <font-awesome-icon icon="arrow-circle-left" class="h4 text-primary mr-1 m-0 float-left" title="Atras" />
                <span>
                    <u>Volver</u>
                </span>
            </div>
            <div class="col-6"></div>
            <div @click="download()"
            class="col-3 p-0 d-flex pointer align-items-center justify-content-end">
                <span>
                    <u>Descargar</u>
                </span>
                <font-awesome-icon icon="file-download" class="ml-1 text-primary h3 m-0 float-right" title="Descargar receta"/>
            </div>
        </div>
        <div class="w-100 col-12 col-lg-8 p-0" id="my_pdf_viewer">
            <div class="" id="canvas_container">
                <canvas class="border border-dark" id="pdf_renderer"></canvas>
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
            }
        }
    },
    methods: {
        download(){
            let bytes = new Uint8Array(this.$store.state.dataPDF); // pass your byte response to this constructor

            let blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes

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
                let viewport = page.getViewport({scale: (container.offsetWidth / page.getViewport({scale:1.1}).width)});
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
        const loadPDF = pdfjsLib.getDocument({data: this.$store.state.dataPDF}).promise.then(pdf => {
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