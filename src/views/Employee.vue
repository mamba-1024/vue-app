<template>
  <el-table :data="tableData" style="width: 100%" v-loading="loading">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts">

import request from '../utils/request';
import { ref } from 'vue'

export default {
  name: 'Employee',
  data() {
    return {
      loading: ref(false),
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    };
  },
  mounted() {
    this.loading = true
    request({
      url: '/api/user',
      method: 'get',
      data: {}
    }).then((res) => {
      console.log(res);
    }).finally(() => {
      this.loading = false
    })
  },
};
</script>
