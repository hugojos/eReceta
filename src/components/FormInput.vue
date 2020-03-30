<template>
    <div class="position-relative">
        <input @input="setModel($event)"
        :type="type" 
        :class="['form-control pr-4', {'border-danger':error}]" 
        :placeholder="placeholder"
        :maxlength="maxlength"
        >
        <font-awesome-icon v-show="error" :id="name" icon="exclamation-triangle" class="text-danger errorIcon position-absolute"/>
        <b-tooltip :target="name"  placement="top">
            {{error}}
        </b-tooltip>
    </div>
</template>
<script>
export default {
    props: {
        error: String,
        model: Object,
        name: String,
        type: String,
        placeholder: String,
        maxlength: {
            default: "false",
            type: String
        }
    },
    methods: {
        setModel(event){
            this.$set(this.model, this.name, event.target.value)
        }
    },
}
</script>
<style>
    .errorIcon {
        right: 5px;
        top: 10px;
        cursor: pointer;
    }
</style>