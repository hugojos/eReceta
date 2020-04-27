<template>
    <div class="row w-100 justify-content-center h-75">
        <div class="col-12 col-md-8 border">
            <div class="border-bottom">
                <h3 class="font-weight-bold text-left m-0 my-1">Verificación de Email</h3>
            </div>
            <div>
                <p class="h5 my-2">{{responseMessage}}</p>
                <small class="text-muted">Si no es redirrecionado haga click <router-link to="/nueva-receta">aquí.</router-link> </small>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            query: this.$route.query,
            responseMessage: ''
        }
    },
    methods: {
        ...mapActions(['updateAuth'])
    },
    mounted(){
        console.log(this.$route.query)
        axios.get('http://'+properties.ip+'/validar?tokenRecibido='+this.query.token)
        .then(response => {
            console.log(response)
            this.responseMessage = '¡La cuenta se ha validado correctamente!'
            //this.updateAuth(response.data)
            setTimeout(() => this.$router.push('/iniciar-sesion'), 5000)
        })
        .catch(error => {
            console.dir(error)
            this.responseMessage = 'No se pudo validar la cuenta'
        })
    }
}
</script>