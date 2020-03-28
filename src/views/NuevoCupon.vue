<template>
    <div class="h-100 row justify-content-center">
        <div class="col-12 col-md-8 mt-2 text-left">
            <span class="text-muted">Datos del paciente</span>
            <form @submit="validate()" 
            action="" method="POST" class="border border-dark p-2">
                <div class="form-group row">
                    <div class="col-6 pr-1 text-left">
                        <label for="">Nombre</label>
                        <form-input :model="paciente" :error="error.nombre" type="text" name="nombre" placeholder="Ingrese nombre"/>
                    </div>
                    <div class="col-6 pl-1 text-left">
                        <label for="">Apellido</label>
                        <form-input :model="paciente" :error="error.apellido" type="text" name="apellido" placeholder="Ingrese apellido"/>
                    </div>
                </div>
                <div class="form-group text-left">
                    <label for="">DNI</label>
                    <form-input :model="paciente" :error="error.dni" type="text" name="dni" placeholder="Ingrese DNI"/>
                </div>
            </form>
        </div>
        <div class="col-12 col-md-8 my-3">
            <div class="position-relative">
                <input :value="query" @input="query = $event.target.value"
                type="text" class="form-control pl-4" placeholder="¿Qué medicamento esta buscando?">
                <font-awesome-icon icon="search" class="position-absolute text-muted" style="left: 7px; top: 11px"/>
            </div>
            <ul class="list-unstyled bg-light">
                <li
                v-for="medicamento in listaMedicamento" :key="medicamento.id"
                @click="addSeleccionado(medicamento)"
                class="p-2 text-left border-bottom d-flex justify-content-between align-items-center"
                style="cursor:pointer"
                >
                <span>{{medicamento.nombre}}</span>
                <span class="text-muted small "><u>Seleccionar</u></span> 
                </li>
            </ul>
        </div>
        <div class="col-12 col-md-8 m-auto">
            <h2 class="text-muted h6">Medicamentos seleccionados</h2>
            <table class="table mb-0 text-muted table-bordered">
                <thead>
                    <tr class="h6 text-left">
                        <th></th>
                        <th style="width:80%;">Nombre</th>
                        <th style="width:20%;">Cantidad</th>
                    </tr>
                </thead>
                <tbody class="text-left">
                    <template v-for="(medicamento,index) in seleccionados">
                        <tr :key="index">
                            <td class="px-1">
                                <div @click="sacarSeleccionado(medicamento)"
                                class="bg-danger p-1 rounded pointer" style="line-height: 0.5">
                                    <font-awesome-icon icon="trash-alt" class="text-white" title="Eliminar"/>
                                </div>
                            </td>
                            <td scope="row" class="small">{{medicamento.nombre}}</td>
                            <td>
                                <div class="d-flex justify-content-between">
                                    <div @click="Number(medicamento.cantidad) ? medicamento.cantidad-- : ''" 
                                    class="bg-purpura p-1 rounded pointer d-flex align-items-center" style="line-height: 0.5">
                                        <font-awesome-icon icon="minus" class="small text-white" title="Restar"/>
                                    </div>
                                    <div>
                                        {{medicamento.cantidad}}
                                    </div>
                                    <div @click="medicamento.cantidad++" 
                                    class="bg-purpura p-1 rounded pointer d-flex align-items-center" style="line-height: 0.5">
                                        <font-awesome-icon icon="plus" class="small text-white" title="Sumar"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="col-12 col-md-8 my-2">
            <button @click="validate()"
            class="btn btn-primary">Siguiente</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            paciente: {
                nombre: '',
                apellido: '',
                dni: '',
            },
            error:{},
            medicamentos: [],
            seleccionados: [],
            query: ''
        }
    },
    computed: {
        listaMedicamento(){
            if(this.query.length) {
                return this.medicamentos.filter(medicamento => {
                    return medicamento.nombre.includes(this.query.toUpperCase())
                }).slice(0, 5)
            }
        }
    },
    methods: {
        ...mapActions(['updateDataPDF']),
        validate(){
            this.error = {}
            if(isNaN(this.paciente.dni))
                this.error.dni = '¡El DNI es invalido!'
            Object.keys(this.paciente).forEach(key => {
                if(!this.paciente[key])
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.enviar()
        },
        addSeleccionado(data){
            this.query = ''
            this.seleccionados.push(data)
            let i = this.medicamentos.findIndex(medicamento => medicamento.nombre == data.nombre)
            this.medicamentos.splice(i, 1)
        },
        sacarSeleccionado(data){
            let i = this.seleccionados.findIndex(medicamento => medicamento.nombre == data.nombre)
            this.medicamentos.push(this.seleccionados.splice(i, 1)[0])
        },
        enviar(){
            let data = {
                usuarioMedicoDto: this.$store.state.auth,
                pacienteDto: this.paciente,
                medicamentoDtos: this.seleccionados
            }
            axios.post('http://190.19.60.31:5004/erp-web/view/recetaCupon/nuevoCupon', data)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/cupon')
            })
        },
    },
    mounted(){
        axios.post('http://190.19.60.31:5004/erp-web/view/recetaCupon/medicamentos', {
            nombre: '',
            descuento:'',
            cantidad:''
        })
        .then(response => {
            console.log(response)
            this.medicamentos = response.data
        })
        document.querySelector('table').addEventListener('mousedown', (e) => {
            e.preventDefault()
        })
    }
}
</script>
<style>
    .list-unstyled{
        z-index: 20;
    }
</style>