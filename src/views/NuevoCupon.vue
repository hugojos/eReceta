<template>
    <div class="h-100 row justify-content-center align-items-center">
        <div class="row justify-content-between h-100 col-12 col-md-6">
            <div class="col-12 px-0 mt-2 text-left">
                <span class="text-muted">Datos del paciente</span>
                <form action="" method="POST" class="border border-dark p-2">
                    <div class="form-group row">
                        <div class="col-6 pr-1 text-left">
                            <label for="">Nombre</label>
                            <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                        </div>
                        <div class="col-6 pl-1 text-left">
                            <label for="">Apellido</label>
                            <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                        </div>
                    </div>
                    <div class="form-group text-left">
                        <label for="">DNI</label>
                        <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="">
                    </div>
                </form>
            </div>
            <div class="col-12 px-0 position-relative">
                <input type="text" class="form-control pl-4" placeholder="¿Qué medicamento esta buscando?">
                <font-awesome-icon icon="search" class="position-absolute text-muted" style="left: 7px; top: 12px"/>
            </div>
            <div class="col-12 px-0">
                <h2 class="text-muted h6">Medicamentos seleccionados</h2>
                <table class="table mb-0 text-muted table-bordered">
                    <thead>
                        <tr class="h6 text-left">
                            <th>Nombre</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody class="text-left">
                        <tr>
                            <td scope="row">FLUTIVENT 125/25 AEROSOL X 150 DOSIS</td>
                            <td>5 unidades</td>
                        </tr>
                        <tr>
                            <td scope="row">FLUTICORT SPRAY NASAL X 60 DOSIS</td>
                            <td>1 unidades</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12 px-0">
                <button class="btn btn-primary">Siguiente</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>