<template>
    <div class="row w-100 justify-content-center h-75 mt-5">
        <div class="col-12 col-md-8 col-lg-6 text-center">
            <div class="mb-4">
                <img src="img/eReceta.png" class="w-100" alt="">
                <div class="version mt-3">
                    <span class="h4 mb-0 font-weight-bold text-uppercase">{{version}}</span>
                </div>
            </div>
            <form-login @respuesta="validate()"/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            user: {
                email: '',
                password: '',
            },
            error: {},
            showPassword: false,
            loading: false,
            status: true,
            alertMessage: '',
            recordarme: false,
            version: properties.version
        }
    },
    methods: {
        validate(){
            if(this.$store.state.auth) this.$router.push('/nueva-receta')
        }
    },
    mounted(){
        if(this.$store.state.auth) this.$router.push('nueva-receta')
    }
}
</script>
