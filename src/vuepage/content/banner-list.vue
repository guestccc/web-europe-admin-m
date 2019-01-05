<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <div>
        <el-button
          type="primary"
          plain
          @click="event().toAddOrEditClick({})">新建轮播图</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="排序"/>
      <el-table-column
        prop="priority"
        label="轮播图名称"/>
      <el-table-column
        prop="banner_src"
        label="轮播图"
        width="161">
        <template slot-scope="scope">
          <img
            :src="imgDomain+'/'+scope.row.banner_src"
            width="141px">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="跳转链接"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="330">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toAddOrEditClick(scope.row)">
            编 辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            class="mini-el-button"
            plain
            @click="event().onDelClick(scope.row.uuid)">
            删 除
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
  </el-main>
</template>

<script>
import { GetFristCategory, delCategory } from '../../api/commodity'
import { imgDomain } from '../../configs/env'

export default {
  data() {
    return {
      imgDomain,
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
        toNextListClick: (uuid) => {
          this.$router.push({ path: 'commodity-class-next-list', query: { parent_uuid: uuid } })
        },
        toAddOrEditClick: (row) => {
          sessionStorage.setItem('class', JSON.stringify(row))
          this.$router.push({ path: 'banner-add', query: { uuid: row.uuid } })
        },
        onDelClick: (uuid) => {
          this.handler().isDel(uuid)
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
