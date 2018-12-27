<template>
  <el-container class="full-height bg-gray">
    <el-main class="page-content">
      <dk-table
        :data="tableData"
        :fields="fields">
        <el-table-column
          fixed="right"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              size="mini">编辑</el-button>
            <el-button
              size="mini"
              @click="isShowAuthDialog=true">查看权限</el-button>
            <el-button size="mini">删除</el-button>
          </template>
        </el-table-column>
      </dk-table>
    </el-main>
  </el-container>

</template>

<script>

import dkTable from '../../components/dk-table';

export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  components: {
    dkTable,
  },
  computed: {
    name() {
      return this.$store.state.users.name
    },
  },
  data() {
    return {
      fields: [
        { prop: 'name', label: '姓名' },
        { prop: 'province', label: '省份' },
        { prop: 'city', label: '城市' },
        { prop: 'address', label: '地址' },
        { prop: 'zip', label: 'zip' },
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
