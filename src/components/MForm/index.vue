<template>
  <el-form
    v-bind="$attrs"
    :model="Model"
    :ref="form"
    :show-message="showMessage"
    :status-icon="statusIcon"
    :size="size"
    :label-width="labelWitdh"
    :inline="inline"
  >
    <el-row :gutter="gutter">
      <template v-for="(item, index) in _formItems">
        <component
          :is="inline ? 'span' : 'el-col'"
          :key="index + item.attrs.key || item.slot"
          :span="item.itemAttrs.col || 24"
        >
          <el-form-item
            v-if="item._ifRender"
            :key="index + item.attrs.key || item.slot"
            v-bind="item.itemAttrs || {}"
            :prop="item.attrs.key"
          >
            <slot v-if="item.slot" :name="item.slot" :scope="Model" />
            <component
              v-else
              :is="item.tag"
              :class="item.attrs.className"
              v-model="Model[item.attrs.key]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
            />
          </el-form-item>
        </component>
      </template>
      <component :is="inline ? 'span' : 'el-col'" :span="btnCol">
        <el-form-item>
          <slot name="actions" />
          <el-button v-if="!!submitLabel" type="primary" @click="handleSubmit">{{ submitLabel }}</el-button>
          <el-button v-if="resetLabel" type="info" @click="handleReset">{{ resetLabel }}</el-button>
        </el-form-item>
      </component>
    </el-row>
  </el-form>
</template>

<script>
import { basic } from "./BASIC"
import { proxyProp } from "@/utils/proxyProp"
import { findComponentUpwardByProp } from "@/utils/findComponents"
import BaseCheckboxGroup from '../BaseCheckboxGroup'
import BaseRadioGroup from '../BaseRadioGroup'
import BaseSelect from '../BaseSelect'

const form = Symbol("form") //保证每个实例有独一无二的标志位

export default {
  name: "MForm",
  components: {
    BaseCheckboxGroup,
    BaseRadioGroup,
    BaseSelect
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    formItems: {
      type: Array,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    formName: {
      type: String,
      required: true
    },
    labelWitdh: {
      type: String,
      default: 'auto'
    },
    size: {
      type: String,
      default: 'small'
    },
    submitLabel: {
      type: [ Boolean, String ],
      default: '提交'
    },
    resetLabel: {
      type: [ Boolean, String ],
      default: '重置'
    },
    gutter: {
      type: Number,
      default: 24
    },
    btnCol: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      Model: {},
      originModel: {},
      form
    };
  },
  computed: {
    //根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      //this.Model中的值改变触发computed
      let _formItems = []
      _formItems = this.formItems.map(item => {
        this.$emit('change', this.Model)
        return this.computeFormItem(item, this.Model)
      })
      return _formItems
    },
    showMessage() {
      return this.$attrs["show-message"] !== false
    },
    statusIcon() {
      return this.$attrs["status-icon"] !== false
    },
  },
  watch: {
    //使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.key) return //跳过没有key的属性(插槽)
          this.$set(
            this.Model,
            formItem.attrs.key,
            formItem.attrs.value ? formItem.attrs.value : ""
          )
        })
        this.originModel = JSON.parse(JSON.stringify(this.Model))
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    //代理父组件的mergeForm属性
    // let parentComponent = findComponentUpwardByProp(this, this.formName)
    // if (parentComponent) {
    //   parentComponent[this.formName] = proxyProp(parentComponent[this.formName])
    // } else {
    //   throw new Error("can not find parentComponent");
    // }
    //mounted钩子中formItems是空数组,所以不在mounted里面操作formItems
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem }
      // 表单控件的类型
      console.log(item)
      let tag = item.tag || "input"
      // 对应到组件映射表
      let basicItem = basic[tag]
      item.tag = basicItem.component
      //继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
      // 获取动态 Attributes
      if (item.getAttrs){
        item.attrs = Object.assign(item.attrs, item.getAttrs(Model))
      }
      // 条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true
      // 防止表单提交时存在多余 key
      if (!item._ifRender) {
        delete Model[item.attrs.key]
      }
      // form-item 配置
      return item
    },
    //提交按钮
    handleSubmit() {
      this.$refs[form].validate((valid, invalidFields) => {
        console.log(invalidFields)
        if(!valid) {
          this.$message.error('请填写相关项目')
          return
        }
        this.$emit('on-submit')
      })
    },
    handleReset() {
      this.Model = JSON.parse(JSON.stringify(this.originModel))
    }
  }
}
</script>
