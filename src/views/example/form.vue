<template>
  <div class="app-container">
    <m-form v-model="form" @on-submit="handleSubmit" :formItems="formItems" form-name="form">
      <template v-slot:colorPicker>
        <el-color-picker v-model="form.colorPicker" />
      </template>
    </m-form>
    <div>{{form}}</div>
  </div>
</template>
<script>
import MForm from '_c/MForm'
import { formItems } from './formItems'
export default {
  name: 'formPage',
  components: {
    MForm
  },
  data() {
    return {
      form: {},
      formItems
    }
  },
  methods: {
    handleSubmit() {
      console.log(...this.form)
    },
    handleChange(value) {
      this.form = value
    }
  }
}
</script>