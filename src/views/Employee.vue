<template>
  <!-- 搜索表单-->

  <el-button type="primary">查询</el-button>
  <el-button type="primary" plain @click="handleCreate">新增</el-button>
  <el-button type="danger" plain>批量删除</el-button>

  <!-- 添加数据对话框 -->
  <el-dialog title="提示" v-model="dialogVisible" width="50%">
    <el-form ref="formAdd" :model="employee" label-width="80px">
      <el-form-item label="员工编号">
        <el-input v-model="employee.id"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="employee.employeeName"></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-input v-model="employee.department"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="employee.position"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addEmployee">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 编辑数据对话框 -->
  <el-dialog title="提示" v-model="dialogVisibleEdit" width="30%">
    <el-form ref="form" :model="employee" label-width="80px">
      <el-form-item label="员工编号">
        <el-input v-model="employee.id"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="employee.employeeName"></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-input v-model="employee.department"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="employee.position"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleEdit">提交</el-button>
        <el-button @click="dialogVisibleEdit = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 表格数据 -->
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" label="序号" :index="1"></el-table-column>
    <el-table-column
      prop="id"
      label="员工编号"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="employeeName"
      label="员工姓名"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="department"
      label="岗位"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="position"
      label="职位"
      align="center"
    ></el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleUpdate(scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[5, 10, 15, 20]"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount"
  >
  </el-pagination>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue'
const API_URL = 'http://192.168.0.110:8080/employees'; // 替换为实际的 API 地址
const formAdd = ref()
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      dialogVisible: false,
      dialogVisibleEdit: false,
      employee: {
        id: '',
        employeeName: '',
        department: '',
        position: '',
      },
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      //发送ajax请求
      axios
        .get(
          'http://192.168.0.110:8080/employees/page?currentPage=' +
            this.currentPage +
            '&pageSize=' +
            this.pageSize
        )
        .then((res) => {
          console.log(res.data);
          //设置表格数据
          this.tableData = res.data.rows;
          this.totalCount = res.data.totalCount;
        });
    },
    async addEmployee() {
      try {
        await axios.post(API_URL, this.employee);
        this.dialogVisible = false;
        this.getAll();
        this.resetForm();
        this.$message.success('员工添加成功');
      } catch (error) {
        console.error(error);
        this.$message.error('员工添加失败');
      }
    },
    resetForm() {
      formAdd.resetFields();
    },
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
    },
    async handleDelete(row) {
      try {
        await axios.delete(`${API_URL}/${row.id}`);
        this.getAll();
        this.$message.success('员工删除成功');
      } catch (error) {
        console.error(error);
        this.$message.error('员工删除失败');
      }
    },
    async handleUpdate(row) {
      console.log('ddddddd', row);
      this.employee = { ...row };
      this.dialogVisibleEdit = true;
    },
    async handleEdit() {
      try {
        await axios.put(API_URL, this.employee);
        this.dialogVisibleEdit = false;
        this.getAll();
        this.$message.success('员工更新成功');
      } catch (error) {
        console.error(error);
        this.$message.error('员工更新失败');
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'table-row-even';
      }
      return '';
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getAll();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //点击后重新设置当前页码
      this.currentPage = val;
      this.getAll();
    },
  },
};
</script>

<style scoped>
.table-row-even {
  background-color: #f5f7fa;
}
</style>
