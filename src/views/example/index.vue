<template>
  <div class="app-container">

    <m-form
      :inline="false"
      :form-items="formItems"
      :merge-form="mergeForm"
      :api="formApi"
      @after-submit="showTableData"
    ></m-form>

    <m-table :data="tableData" :columns="columns">
      <template v-slot:testSlot="{ scope }">{{ format(scope.row.testSlot) }}</template>
    </m-table>

    <!-- <el-button @click="toggleTableHeader">切换表头</el-button> -->
  </div>
</template>

<script>
import { columns } from './colnums.js'
import { formItems } from "./formItems"
import { formApi, radioGroup, cascader } from "@/api/example"
import MTable from '_c/MTable'
import MForm from '_c/MForm'

export default {
  name: "example",
  components: {
    MTable,
    MForm
  },
  data() {
    return {
      mergeForm: {
        zhonganAccessFlag: ""
      },
      tableData: [],
      formApi,
      columns,
      formItems,
      showTableHeader: true
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    showTableData(res) {
      console.log(res)
      this.tableData = res.tableData;
    },
    handleClick() {
      //mergeForm使用了Proxy拦截所以不需要手动刷新视图
      this.mergeForm.name = "yeyan1996";
    },
    // toggleTableHeader() {
    //   this.showTableHeader = !this.showTableHeader;
    //   //columns属性使用了Proxy拦截同样不需要手动刷新视图
    //   this.$hideTableHeader(this.columns, "dataType", this.showTableHeader);
    // },
    findItem(key) {
      return this.formItems.find(
        formItem => formItem.attrs && formItem.attrs.key === key
      );
    },
    async getInfo() {
      try {
        let [res1, res2] = await Promise.all([radioGroup(), cascader()]);
        this.findItem("asyncRadio").attrs.options = res1.options;
        this.findItem("cascader").attrs.options = res2.options;
      } catch (e) {
        console.log(e);
      }
    },
    format(str) {
      return `处理后的${str}`;
    },
    // showMessage() {
    //   this.$selfMessage({
    //     value: "这是一条消息提示",
    //     duration: 2000
    //   });
    // }
  }
};
</script>
