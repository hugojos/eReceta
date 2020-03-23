<template>
    <div class="h-100 row justify-content-center align-items-center">
        <form action="" method="POST" class="mt-5 col-12 col-md-6 col-lg-4 text-center">
            <div class="form-group text-left">
                <label for="">Usuario</label>
                <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
            </div>
            <div class="form-group text-left">
                <label for="">Contraseña</label>
                <div class="position-relative">
                    <input type="password" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                    <font-awesome-icon icon="eye" class="position-absolute" style="right: 7px; top: 10px"/>
                </div>
            </div>
            <div class="form-group mt-4">
                <button type="button" class="btn btn-primary px-5">Acceder</button>
            </div>
            <div class="form-group d-flex flex-column">
                <a href="">Recuperar contraseña</a>
                <router-link to="/registrar-medico">Registrarse</router-link>
            </div>
        </form>
    </div>
</template>

<script>

export default {

}
</script>
