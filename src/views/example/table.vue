<template>
  <div class="app-container">
    <m-table :data="tableData" :columns="columns">
      <template v-slot:font>
        <h2>默认插槽</h2> 
      </template>
      <template v-slot:testSlot="{ scope }">{{ format(scope.row.testSlot) }}</template>
    </m-table>
  </div>
</template>
<script>
import { columns } from "./colnums.js"
import MTable from "_c/MTable"
export default {
  name: "tablePage",
  components: {
    MTable
  },
  data() {
    return {
      columns,
      tableData: [
        {
          callStatus: "1",
          dataType: "1",
          infoType: "1   ",
          listCat: "3",
          requestTime: "2018/11/12",
          testSlot: "测试插槽1"
        },
        {
          callStatus: "2",
          dataType: "1",
          infoType: "2   ",
          listCat: "3",
          requestTime: "2018/11/13",
          testSlot: "测试插槽2"
        },
        {
          callStatus: "3",
          dataType: "1",
          infoType: "3",
          listCat: "3",
          requestTime: "2018/11/14",
          testSlot: "测试插槽3"
        },
        {
          callStatus: "0 ",
          dataType: "1",
          infoType: "1",
          listCat: "3",
          requestTime: "2018/11/15",
          testSlot: "测试插槽4"
        },
        {
          callStatus: "2",
          dataType: "1",
          infoType: "2",
          listCat: "3",
          requestTime: "2018/11/16",
          testSlot: "测试插槽5"
        }
      ]
    }
  },
  methods: {
    format(str) {
      return `处理后的${str}`
    }
  }
};
</script>