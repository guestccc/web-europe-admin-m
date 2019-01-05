<template>
  <el-main class="page-content-margin-unset">
    <h3>物流信息</h3>
    <!-- 表格 -->
    <el-table
      border
      class="dk-li"
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="物流单号"/>
      <el-table-column
        prop="priority"
        label="发货时间"/>
      <el-table-column
        prop="priority"
        label="出发地"/>
      <el-table-column
        prop="priority"
        label="目的地"/>
    </el-table>
    <h3>对应商品订单</h3>
    <!-- 表格 -->
    <el-table
      border
      class="dk-li"
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="订单号"/>
      <el-table-column
        prop="priority"
        label="创建时间"/>
      <el-table-column
        prop="priority"
        label="用户昵称"/>
      <el-table-column
        prop="priority"
        label="手机号"/>
      <el-table-column
        prop="priority"
        label="订单状态"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="330">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row)">
            详 情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="body.page_index"
        :page-size="body.page_size"
        layout="prev, pager, next"
        :total="total"/>
    </div>
    <h3>对应商品兑换订单</h3>
    <!-- 表格 -->
    <el-table
      border
      class="dk-li"
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="订单号"/>
      <el-table-column
        prop="priority"
        label="创建时间"/>
      <el-table-column
        prop="priority"
        label="用户昵称"/>
      <el-table-column
        prop="priority"
        label="手机号"/>
      <el-table-column
        prop="priority"
        label="订单状态"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="330">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row)">
            详 情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="body.page_index"
        :page-size="body.page_size"
        layout="prev, pager, next"
        :total="total"/>
    </div>
    <h3>物流动态</h3>
    <!-- 表格 -->
    <el-table
      border
      class="dk-li"
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="时间"/>
      <el-table-column
        prop="priority"
        label="当前状态"/>
    </el-table>

    <el-button
      type="primary"
      class="mini-el-button"
      @click="event().toDetailClick(scope.row)">
      返 回
    </el-button>
  </el-main>
</template>

<script>
import { GetFristCategory, delCategory } from '../../api/commodity'
import { imgDomain } from '../../configs/env'

export default {
  data() {
    return {
      imgDomain,
      updateTitle: '新增',
      updateDialog: false,
      addBogy: {
        priority: '',
        name: '',
      },
      body: {
        keyWord: '',
        page_index: 1,
        page_size: 20,
      },
      total: 0,
      tableData: [
        {},
      ],
    };
  },

  components: {
  },
  created() {
    this.network().GetFristCategory()
  },
  methods: {
    handleCurrentChange() {

    },
    event() {
      return {
        toAddClick: () => {
          this.$router.push({ path: '/logistics-management/add' })
        },
        onUpdateClick: () => {
          this.updateDialog = true
        },
      }
    },
    network() {
      return {
        GetFristCategory: async () => {
          const { status, data } = await GetFristCategory()
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        delCategory: async (uuid) => {
          const { status } = await delCategory(uuid)
          if (status !== 200) return
          this.network().GetFristCategory()
          this.$notify({
            title: '删除成功',
            message: '删除一级分类成功',
            type: 'success',
          });
        },
      }
    },
    handler() {
      return {
        isDel: (uuid) => {
          this.$confirm('确定删除分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.network().delCategory(uuid)
              .then(() => {
                if (this.tableData.length === 1 && this.total > 10) {
                  this.body.page_index = this.body.page_index - 1
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
        },
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
