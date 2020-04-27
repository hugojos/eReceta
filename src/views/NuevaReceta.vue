<template>
    <div class="h-100 row pt-2 justify-content-center">
        <template v-for="(medicamento, index) in seleccionados">
            <b-modal 
            :key="index"
            :id="medicamento.idProductoLaboratorio" 
            class="rounded" 
            centered>
                <template v-slot:modal-title>
                    <span class="m-0 text-muted h6">Escriba la posología del medicamento</span>
                    <p class="h6 m-0"><span>{{medicamento.nombre}}</span></p>
                </template>
                <div class="d-block">
                    <textarea
                    @input="setPosologia(medicamento, $event)"
                    :value="medicamento.posologia"
                    class="w-100 form-control"
                    placeholder="Maximo 500 caracteres"
                    rows="5"
                    style="resize: none;"></textarea>
                    <span class="text-muted">{{500 - (medicamento.posologia ? medicamento.posologia.length : 0)}} caracteres restantes</span>
                </div>
                <template v-slot:modal-footer>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6 pl-0 text-left">
                                <b-button @click="$bvModal.hide(medicamento.idProductoLaboratorio);medicamento.posologia = ''"
                                variant="outline-danger"
                                class="mr-2">
                                    Cancelar
                                </b-button>
                            </div>
                            <div class="col-6 px-0 text-right small">
                                <b-button @click="$bvModal.hide(medicamento.idProductoLaboratorio)"
                                variant="primary">
                                    Aceptar
                                </b-button>
                            </div>
                        </div>
                    </div>
                </template>
            </b-modal>
        </template>
        <div class="col-12 col-md-6 text-left">
            <span class="text-muted font-weight-bold">Datos del paciente</span>
            <form @submit="validate()" 
            action="" method="POST" class="border border-dark p-2">
                <div class="form-group row">
                    <div class="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                        <label for="" class="font-weight-bold">Nombre</label>
                        <form-input :model="paciente" :error="error" type="text" name="nombre" placeholder="Ingrese nombre" />
                    </div>
                    <div class="col-6 col-md-12 pl-1 pl-md-3 text-left">
                        <label for="" class="font-weight-bold">Apellido</label>
                        <form-input :model="paciente" :error="error" type="text" name="apellido" placeholder="Ingrese apellido" />
                    </div>
                </div>
                <!--<div class="form-group text-left">
                    <label for="email" class="font-weight-bold">Email <span class="text-muted small">(opcional)</span> </label>
                    <form-input :model="paciente" :error="error" type="email" name="email" placeholder="Ingrese email"/>
                </div>-->
                <div class="form-group text-left">
                    <label for="" class="font-weight-bold">DNI <span class="text-muted small">(opcional)</span> </label>
                    <form-input :model="paciente" :error="error" type="number" name="dni" placeholder="Ingrese DNI"/>
                </div>
                <div class="form-group text-left">
                    <label for="" class="font-weight-bold">Obra social <span class="text-muted small">(opcional)</span> </label>            
                    <select v-model="paciente.obraSocial"
                    class="custom-select" name="" id="">
                        <option value="">Seleccionar</option>
                        <option v-for="obra in obraSociales" :key="obra.nombre" :value="obra.nombre">{{obra.nombre}} </option>
                    </select>
                </div>
                <div v-if="paciente.obraSocial"
                class="form-group text-left">
                    <label for="afiliado" class="font-weight-bold">N° Afiliado</label>
                    <form-input :model="paciente" :error="error" type="text" name="numeroAfiliado" placeholder="Ingrese numero afiliado"/>
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
                        class="p-2 text-left border-bottom d-flex justify-content-between align-items-center pointer">
                            <span style="line-height: 1">{{medicamento.nombre + ' - ' + medicamento.formula}}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-12 m-auto">
                    <h2 class="text-muted h6 font-weight-bold">Medicamentos seleccionados ({{seleccionados.length}})</h2>
                    <table class="table mb-0 text-muted table-bordered">
                        <thead>
                            <tr class="h6 text-left">
                                <th></th>
                                <th style="width:65%">Nombre</th>
                                <th style="width:35%">Cantidad</th>
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
                                    <td class="px-2">
                                        <div class="d-flex">
                                            <div class="d-flex justify-content-center w-75">
                                                <div @click="medicamento.cantidad != 1 ? medicamento.cantidad-- : ''" 
                                                class="bg-purpura p-1 rounded pointer d-flex align-items-center" style="line-height: 0.5">
                                                    <font-awesome-icon icon="minus" class="small text-white" title="Restar"/>
                                                </div>
                                                <div class="mx-2">{{medicamento.cantidad}}</div>
                                                <div @click="medicamento.cantidad++" 
                                                class="bg-purpura p-1 rounded pointer d-flex align-items-center" style="line-height: 0.5">
                                                    <font-awesome-icon icon="plus" class="small text-white" title="Sumar"/>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-center w-25">
                                                <div @click="mostarPosologia(medicamento.idProductoLaboratorio)" 
                                                class="bg-purpura p-1 rounded pointer d-flex align-items-center justify-content-center text-light font-weight-bolder h-100" style="line-height: 0.5">
                                                    <span title="Escribir posología">P</span>
                                                </div>
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
                email:'',
                dni: '',
                obraSocial: '',
                numeroAfiliado: ''
            },
            error:{},
            medicamentos: [],
            obraSociales: [],
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
                let busquedaPorFormula = this.medicamentos.filter(medicamento => {
                    return medicamento.formula != undefined ? medicamento.formula.includes(this.query.toUpperCase()) : false
                })
                lista = Object.assign(lista, busquedaPorFormula).slice(0,6)
                return lista;
            }
        },
        seleccionadosNoEsCero(){
            return this.seleccionados.find(medicamento => medicamento.cantidad > 0)
        }
    },
    methods: {
        ...mapActions(['updateDataPDF','updateData']),
        validate(){
            this.error = {}
            console.log(this.seleccionados)
            this.errorStatus = false
            if(this.paciente.dni.length && !(this.paciente.dni.length >= 7 && this.paciente.dni.length <= 8)) this.error.dni = 'El DNI debe tener entre 7 y 8 digitos'
            if(this.paciente.obraSocial.length && !this.paciente.numeroAfiliado.length) this.error.numeroAfiliado = 'El campo no debe estar vacio'
            if(!this.seleccionadosNoEsCero) this.error.message = 'La cantidad no puede ser 0'
            if(!this.seleccionados.length) this.error.message = '¡Debe seleccionar al menos un medicamento!'
            Object.keys(this.paciente).forEach(key => {
                if(!this.paciente[key] && key != 'dni' && key != 'obraSocial' && key != 'numeroAfiliado' && key != 'email')
                    this.$set(this.error, key, 'El campo no debe estar vacio')
                if((key == 'nombre' || key == 'apellido') && !/^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/.test(this.paciente[key]))
                    this.$set(this.error, key, 'El campo debe contener solo letras')
            })
            if(!Object.keys(this.error).length)
                this.siguiente()
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
        siguiente(){
            this.loading = true
            this.errorStatus = false
            let data = {
                usuarioMedicoDto: this.$store.state.auth,
                pacienteDto: this.paciente,
                medicamentoDtos: this.seleccionados
            }            
            this.updateData(data)
            this.$router.push('/firmar')
        },
        mostarPosologia(id){
            this.$bvModal.show(id)
        },
        setPosologia(model, event){
            if(event.target.value.length > 500) event.preventDefault()
            else this.$set(model,'posologia',event.target.value)
            this.$forceUpdate()
        }
    },
    mounted(){
        //Carga lista de medicamentos
        axios.post('http://'+properties.ip+'/medicamentos', {
            nombre: '',
            descuento:'',
            cantidad:''
        })
        .then(response => {
            this.medicamentos = response.data
            console.log(response)
        })
        .catch(error => {
            this.errorStatus = true
            this.error.message = 'No se pudo cargar la lista de medicamentos: ' + error.message
        })
        //Carga lista de obra social
        axios.post('http://'+properties.ip+'/obrasSociales')
        .then(response => this.obraSociales = response.data)

        document.querySelector('table').addEventListener('mousedown', (e) => {
            e.preventDefault()
        })
    },
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