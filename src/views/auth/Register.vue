<template>
    <div class="h-100 row justify-content-center align-items-center">
        <form action="" method="POST" class="mt-2 col-12 col-md-6 col-lg-4 text-center">
            <div class="form-group text-left">
                <label for="">Nombres</label>
                <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
            </div>
            <div class="form-group text-left">
                <label for="">Apellidos</label>
                <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">DNI</label>
                    <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                </div>
                <div class="col-6 pl-1 text-left">
                    <label for="">Telefono</label>
                    <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">Email</label>
                    <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                </div>
                <div class="col-1 align-items-end d-flex justify-content-center">
                    <span class="h4 text-muted">@</span>
                </div>
                <div class="col-5 align-items-end d-flex pl-1 text-left">
                    <label for=""></label>
                    <select class="pl-1 form-control" name="" id="">
                        <option value="" selected>Seleccionar</option>
                        <option>gmail.com</option>
                        <option>hotmail.com</option>
                        <option>yahoo.com.ar</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-6 pr-1 text-left">
                    <label for="">Nro Matricula</label>
                    <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                </div>
                <div class="col-6 p-0 d-flex flex-column justify-content-end pl-5 text-left">
                    <div class="custom-control custom-radio">
                        <input type="radio" name="tipo" id="nacional" class="custom-control-input">
                        <label class="custom-control-label" for="nacional">Nacional</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input type="radio" name="tipo" id="provincial" class="custom-control-input">
                        <label class="custom-control-label" for="provincial">Provincial</label>
                    </div>
                </div>
            </div>
            <div class="form-group text-left">
                <label for="">Contraseña</label>
                <input type="password" class="form-control" name="" aria-describedby="helpId" placeholder="">
            </div>
            <div class="form-group text-left">
                <label for="">Confirmar contraseña</label>
                <input type="password" class="form-control" name="" aria-describedby="helpId" placeholder="">
            </div>
            <div class="form-group mt-4">
                <button type="button" class="btn btn-primary">Registrarse</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    
}
</script>