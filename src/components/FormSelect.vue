<template>
    <div class="position-relative">
        <select @change="setModel($event)"
        :class="['custom-select pr-4', {'border-danger':error[name]}]" 
        name="" id="">
            <option value="">Seleccionar</option>
            <option v-for="(item, index) in list" :key="index" :value="item[itemValue]">{{item[itemName]}} </option>
        </select>
        <font-awesome-icon
        v-show="error[name]" 
        :id="name" 
        icon="exclamation-triangle" 
        class="text-danger errorIcon position-absolute"/>
        <b-tooltip :target="name" placement="top">
            {{error[name]}}
        </b-tooltip>
    </div>
</template>
<script>
export default {
    props: {
        error: Object,
        model: Object,
        list: Array,
        itemName: String,
        itemValue: String,
        name: String
    },
    methods: {
        setModel(event){ 
            this.$set(this.error, this.name, '')
            this.$set(this.model, this.name, event.target.value)
        }
    },
}
</script>
<style scoped>
    .errorIcon {
        right: 25px;
        top: 10px;
        cursor: pointer;
    }
</style>