<template>
    <div class="h-100 row justify-content-center align-items-center">
        <div class="col-12" id="my_pdf_viewer">
            <div class="" id="canvas_container">
                <canvas class="" id="pdf_renderer"></canvas>
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
        render() {
            this.state.pdf.getPage(this.state.currentPage).then((page) => {
                let canvas = document.getElementById("pdf_renderer");
                let ctx = canvas.getContext('2d');
                let viewport = page.getViewport(1);
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
        pdfjsLib.getDocument('eReceta.pdf').then((pdf) => {
            this.state.pdf = pdf;
            this.render()
        });
    }
}
</script>
<style>
    #canvas_container {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #333;
        text-align: center;
        border: solid 3px;
    }
</style>