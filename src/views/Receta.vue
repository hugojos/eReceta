<template>
    <div class="h-100 w-100 row justify-content-center align-items-center mt-2">
        <div class="col-12 col-lg-8 row align-items-center mb-1 p-0">
            <div class="col-3 p-0 d-flex pointer align-items-center justify-content-start">
            </div>
            <div 
            @click="$router.push('/nueva-receta')"
            class="col-6">
                <b-button variant="primary">
                    Nueva receta
                </b-button>
            </div>
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
        if(!Object.keys(this.$store.state.dataPDF).length) this.$router.push('/nueva-receta')
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