<template>
    <div class="row w-100 justify-content-center h-75">
        <form @keypress.enter="validate()" 
        action="/" method="POST" class="border pt-3 col-12 col-md-8 col-lg-8 text-center">
            <h4 class="mb-3">Escriba su nueva contraseña</h4>
            <div class="form-group text-left">
                <label for="email">Contraseña</label>
                <form-input :model="user" :error="error" type="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>
            <div class="form-group text-left mb-2">
                <label for="password">Confirme contraseña</label>
                <div class="position-relative">
                    <form-input :model="user" :error="error" type="password" name="confirmPassword" placeholder="Confirme su contraseña"/>
                </div>
            </div>
            <div class="form-group mt-3">
                <b-button @click="validate()"
                variant="primary">
                    Reestablecer
                    <b-spinner v-show="loading" 
                    small></b-spinner>
                </b-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: {
                password: '',
                confirmPassword: '',
            },
            error: {},
            loading: false,
            status: true,
            alertMessage: '',
            recordarme: false
        }
    },
    methods: {
        validate(){
            this.error = {}
            if(this.user.password != this.user.confirmPassword)
                this.error.confirmPassword = 'Las contraseñas no coinciden'
            Object.keys(this.user).forEach(key => {
                if(!this.user[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.login()
        },
        login(){
            this.loading = true
            axios.post('http://'+properties.ip+'/erp-web/view/recetaCupon/login', this.user)
            .then(response => {

            })
            .catch(error => {

            })
            .finally(response => {
            })
        }
    },
}
</script>
