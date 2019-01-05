<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-date-picker
        v-model="times"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-input
        placeholder="物流单号"
        v-model="body.keyWord"
        class="input-with-select dk_input">
        <el-button
          slot="append"
          icon="el-icon-search"/>
      </el-input>
      <div>
        <el-button
          type="primary"
          plain
          @click="event().toAddOrEditClick({})">导出Excel</el-button>
        <el-button
          type="primary"
          plain
          @click="event().toAddClick({})">新增物流单</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
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
          <el-button
            size="mini"
            type="danger"
            class="mini-el-button"
            plain
            @click="event().onUpdateClick(scope.row.uuid)">
            更新物流
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination-center">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="body.page_index"
        :page-size="body.page_size"
        layout="prev, pager, next"
        :total="total"/>
    </div>


    <!-- 添加规格 -->
    <el-dialog
      :title="updateTitle"
      width="480px"
      :visible.sync="updateDialog">
      <el-form
        :model="standard"
        label-position="left"
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="排 序"
          prop="priority">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item
          label="热门搜索词"
          prop="name">
          <el-input
            class="dk-input"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="addBogy.name"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="event().onStandardSureClick('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
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
        toDetailClick: () => {
          this.$router.push({ path: '/logistics-management/detail' })
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
@import '../../assets/styles/mixins.scss';
.table-top{
  @include dk-table-top;
}
</style>
