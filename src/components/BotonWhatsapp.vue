<template>
    <div class="position-fixed d-flex align-items-center boton-whatsapp">
        <span v-show="showMessage"
        class="text-white p-1 rounded font-weight-bold" style="background-color:#4cca5a">¿Tenes dudas? ¡Consultanos!</span>
        <a
        :href="url"
        target="_blank"
        @mouseover="mostrarMensaje()" 
        @mouseout="ocultarMensaje()"
        class="pointer" style="z-index:4">
            <img class="" src="img/whatsapp-logo.png" :style="showMessage ? 'width:55px':'width:50px'" alt="">
        </a>
    </div>
</template>
<script>
export default {
    data () {
        return {
            showMessage: false
        }
    },
    computed: {
        url(){
            return 'https://api.whatsapp.com/send?phone='+properties.whatsapp.tel+'&text='+properties.whatsapp.mensaje
        }
    },
    methods: {
        mostrarMensaje(){
            this.showMessage = true
        },
        ocultarMensaje(){
            this.showMessage = false
        }
    }
}
</script>
<style scoped>
    .boton-whatsapp {
        bottom: 1%;
        right: 10px;
        overflow: hidden;
    }
</style>