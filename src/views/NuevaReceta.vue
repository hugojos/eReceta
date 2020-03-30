<template>
    <div class="h-100 row pt-2 justify-content-center">
        <div class="col-12 col-md-6 text-left">
            <span class="text-muted">Datos del paciente</span>
            <form @submit="validate()" 
            action="" method="POST" class="border border-dark p-2">
                <div class="form-group row">
                    <div class="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                        <label for="">Nombre</label>
                        <form-input :model="paciente" :error="error.nombre" type="text" name="nombre" placeholder="Ingrese nombre"/>
                    </div>
                    <div class="col-6 col-md-12 pl-1 pl-md-3 text-left">
                        <label for="">Apellido</label>
                        <form-input :model="paciente" :error="error.apellido" type="text" name="apellido" placeholder="Ingrese apellido"/>
                    </div>
                </div>
                <div class="form-group text-left">
                    <label for="">DNI</label>
                    <form-input :model="paciente" :error="error.dni" type="number" name="dni" placeholder="Ingrese DNI"/>
                </div>
            </form>
        </div>
        <div @keypress.enter="validate()" 
        class="col-12 col-md-6 mt-2 text-center">
            <div class="row">
                <div class="col-12 my-3 my-md-0">
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
                <div class="col-12 m-auto">
                    <h2 class="text-muted h6">Medicamentos seleccionados ({{seleccionados.length}})</h2>
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
                                            <div @click="medicamento.cantidad != 1 ? medicamento.cantidad-- : ''" 
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
                <div class="col-12 my-2 d-flex flex-column align-items-center">
                    <span class="text-danger small" v-if="(error.message && (!seleccionados.length || !seleccionadosNoEsCero )) || errorStatus">{{error.message}}</span>
                    <div class="form-group mt-2">
                        <b-button @click="validate()"
                        variant="primary">
                            Siguiente
                            <b-spinner v-show="loading" 
                            small></b-spinner>
                        </b-button>
                    </div>
                </div>
            </div>
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
            medicamentos: JSON.parse(localStorage.getItem('medicamentos')),
            seleccionados: [],
            query: '',
            loading: false,
            errorStatus : false
        }
    },
    computed: {
        listaMedicamento(){
            if(this.query.length) {
                let lista = this.medicamentos.filter(medicamento => medicamento.nombre.startsWith(this.query.toUpperCase())).slice(0,5)
                lista = !lista.length ? this.medicamentos.filter(medicamento => medicamento.nombre.includes(this.query.toUpperCase())).slice(0,5) : lista
                lista = !lista.length ? this.medicamentos.filter(medicamento => {
                    return medicamento.formula != undefined ? medicamento.formula.includes(this.query.toUpperCase()) : false
                }).slice(0,5) : lista
                return lista;
            }
        },
        seleccionadosNoEsCero(){
            return this.seleccionados.find(medicamento => medicamento.cantidad > 0)
        }
    },
    methods: {
        ...mapActions(['updateDataPDF']),
        validate(){
            this.error = {}
            this.errorStatus = false
            if(this.paciente.dni.length && !(this.paciente.dni.length >= 7 && this.paciente.dni.length <= 8)) this.error.dni = 'El DNI debe tener entre 7 y 8 digitos'
            if(!this.seleccionadosNoEsCero) this.error.message = 'La cantidad no puede ser 0'
            if(!this.seleccionados.length)  this.error.message = '¡Debe seleccionar al menos un medicamento!'
            Object.keys(this.paciente).forEach(key => {
                if(!this.paciente[key] && key != 'dni')
                    this.$set(this.error, key, '¡El campo no debe estar vacio!')
            })
            if(!Object.keys(this.error).length)
                this.enviar()
        },
        addSeleccionado(data){
            this.query = ''
            data.cantidad = 1
            this.seleccionados.push(data)
            let i = this.medicamentos.findIndex(medicamento => medicamento.nombre == data.nombre)
            this.medicamentos.splice(i, 1)
        },
        sacarSeleccionado(data){
            let i = this.seleccionados.findIndex(medicamento => medicamento.nombre == data.nombre)
            this.medicamentos.push(this.seleccionados.splice(i, 1)[0])
        },
        enviar(){
            this.loading = true
            this.errorStatus = false
            let data = {
                usuarioMedicoDto: this.$store.state.auth,
                pacienteDto: this.paciente,
                medicamentoDtos: this.seleccionados
            }
            axios.post('http://'+properties.ip+'/erp-web/view/recetaCupon/nuevoCupon', data)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/receta')
            })
            .catch(error => {
                this.errorStatus = true
                this.error.message = 'No se pudo continuar con el proceso: ' + error.message
            })
            .finally(response => this.loading = false)
        },
    },
    mounted(){
        axios.post('http://'+properties.ip+'/erp-web/view/recetaCupon/medicamentos', {
            nombre: '',
            descuento:'',
            cantidad:''
        })
        .then(response => {
            console.log(response)
            this.medicamentos = response.data
        })
        .catch(error => {
            this.errorStatus = true
            this.error.message = 'No se pudo cargar la lista de medicamentos: ' + error.message
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
    td {
        vertical-align: middle!important;
    }
</style>