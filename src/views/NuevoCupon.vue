<template>
    <div class="h-100 row justify-content-center align-items-center">
        <div class="row justify-content-between h-100 col-12 col-md-8">
            <div class="col-12 px-0 mt-2 text-left">
                <span class="text-muted">Datos del paciente</span>
                <form @submit="validate()" 
                action="" method="POST" class="border border-dark p-2">
                    <div class="form-group row">
                        <div class="col-6 pr-1 text-left">
                            <label for="">Nombre</label>
                            <form-input :model="paciente" :error="error.nombre" type="text" name="nombre" />
                        </div>
                        <div class="col-6 pl-1 text-left">
                            <label for="">Apellido</label>
                            <form-input :model="paciente" :error="error.apellido" type="text" name="apellido" />
                        </div>
                    </div>
                    <div class="form-group text-left">
                        <label for="">DNI</label>
                        <form-input :model="paciente" :error="error.dni" type="text" name="dni" />
                    </div>
                </form>
            </div>
            <div class="col-12 my-3 px-0 position-relative">
                <input :value="query" @input="query = $event.target.value"
                type="text" class="form-control pl-4" placeholder="¿Qué medicamento esta buscando?">
                <font-awesome-icon icon="search" class="position-absolute text-muted" style="left: 7px; top: 11px"/>
                <ul class="list-unstyled position-absolute w-100 bg-light">
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
                        <template v-for="(medicamento,index) in seleccionados">
                            <tr :key="index">
                                <td scope="row">{{medicamento.nombre}}</td>
                                <td class="d-flex align-items-center justify-content-around position-relative">
                                    <div class="mr-2 text-center">
                                        {{medicamento.cantidad}} unidades
                                    </div>
                                    <div class="d-flex flex-column" >
                                        <span @click="medicamento.cantidad++" 
                                        class="text-white text-center p-2 pointer" style="background-color:gray;border: 1px solid black; line-height:0.5">+</span>
                                        <span @click="Number(medicamento.cantidad) ? medicamento.cantidad-- : ''" 
                                        class="text-white text-center p-2 pointer" style="background-color:gray;border: 1px solid black; line-height:0.5">-</span>
                                    </div>
                                    <font-awesome-icon @click="sacarSeleccionado(medicamento)"
                                    title="Eliminar" icon="times" class="text-danger position-absolute pointer" style="right:-25px"/>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="col-12 px-0 my-2">
                <button @click="validate()"
                class="btn btn-primary">Siguiente</button>
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
            axios.post('http://190.221.61.114:5004/erp-web/view/recetaCupon/nuevoCupon', data)
            .then(response => {
                this.updateDataPDF(response.data)
                this.$router.push('/cupon')
            })
        },
    },
    mounted(){
        axios.post('http://190.221.61.114:5004/erp-web/view/recetaCupon/medicamentos', {
            nombre: '',
            descuento:'',
            cantidad:''
        })
        .then(response => {
            console.log(response)
            this.medicamentos = response.data
        })
    }
}
</script>
<style>
    .list-unstyled{
        z-index: 20;
    }
</style>