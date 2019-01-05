<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-select
        class="dk-select"
        v-model="body.first_cat"
        placeholder="一级分类"
        @change="event().onFristCategoryChange()">
        <el-option
          v-for="(item, index) in fristCategory"
          :key="index"
          :label="item.name"
          :value="item.uuid"/>
      </el-select>
      <el-select
        class="dk-select"
        v-model="body.second_cat"
        placeholder="二级分类"
        @change="event().handleCurrentChange()">
        <el-option
          v-for="(item, index) in secondCategory"
          :key="index"
          :label="item.name"
          :value="item.uuid"/>
      </el-select>
      <el-select
        class="dk-select"
        v-model="body.status"
        clearable
        @change="event().handleCurrentChange()">
        <el-option
          label="上架"
          :value="0"/>
        <el-option
          label="下架"
          :value="1"/>
      </el-select>
      <el-select
        class="dk-select"
        v-model="body.is_recommend"
        clearable
        @change="event().handleCurrentChange()">
        <el-option
          label="推荐"
          :value="1"/>
        <el-option
          label="不推荐"
          :value="0"/>
      </el-select>
      <el-input
        placeholder="请输入分类名称进行搜索"
        v-model="body.keyword"
        clearable
        class="input-with-select dk_input"
        @change="event().handleCurrentChange()">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="event().handleCurrentChange()"/>
      </el-input>
      <el-button
        type="primary"
        plain
        @click="event().toAddOrEditClick()">导出Excel</el-button>
      <div>
        <el-button
          type="primary"
          plain
          @click="event().toAddOrEditClick()">新建商品</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="product_no"
        label="商品编号"/>
      <el-table-column
        prop="priority"
        label="排序"/>
      <el-table-column
        prop="first_cat_name"
        label="商品标题"/>
      <el-table-column
        prop="first_cat_name"
        label="一级分类"/>
      <el-table-column
        prop="second_cat_name"
        label="二级分类"/>
      <el-table-column
        prop="price"
        label="商品价格"/>
      <el-table-column
        label="库存"
        width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().onDetailClick(scope.row.uuid)">
            详 情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="上架"
        width="110">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1"
            @change="event().onStatusChange(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="推荐"
        width="110">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="event().onRecommedationChange(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="330">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toAddOrEditClick(scope.row.uuid)">
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
        @current-change="event().handleCurrentChange"
        :current-page.sync="body.page_index"
        :page-size="body.page_size"
        layout="prev, pager, next"
        :total="total"/>
    </div>

    <!-- 库存详情 -->

    <el-dialog
      title="库存详情"
      :visible.sync="stockDialog">
      <el-table :data="gridData">
        <el-table-column
          property="name"
          label="规格"/>
        <el-table-column
          property="stock"
          label="库存"/>
      </el-table>
    </el-dialog>
  </el-main>
</template>

<script>
import {
  getCategory, getCommodityList, getStandardList, delCommoddity, setStatus, setRecommendation,
} from '../../api/commodity'

export default {
  data() {
    return {
      body: {
        keyword: '',
        page_index: 1,
        page_size: 20,
        first_cat: '',
        second_cat: '',
        status: 1,
        is_recommend: 0,
      },
      total: 0,
      fristCategory: [],
      secondCategory: [],
      tableData: [
      ],
      stockDialog: false,
      gridData: [
      ],
    };
  },

  components: {
  },
  created() {
    this.network().getCategory()
  },
  methods: {
    event() {
      return {
        toNextListClick: () => {
          this.$router.push({ path: 'commodity-class-next-list' })
        },
        toAddOrEditClick: (uuid) => {
          this.$router.push({ path: 'commodity-add', query: { uuid } })
        },
        onDetailClick: (uuid) => {
          this.network().getStandardList({ product_uuid: uuid })
        },
        onFristCategoryChange: () => {
          this.body.second_cat = ''
          this.network().getCategory({ parent_uuid: this.body.first_cat })
        },
        onStatusChange: ({ uuid, status }) => {
          this.network().setStatus({ uuid, status })
        },
        onRecommedationChange: ({ uuid, is_recommend }) => {
          this.network().setRecommendation({ uuid, is_recommend })
        },
        onDelClick: (uuid) => {
          this.handler().isDel(uuid)
        },
        handleCurrentChange: () => {
          this.network().getCommodityList(this.body)
        },
      }
    },
    network() {
      return {
        getCategory: async (body) => {
          const { status, data } = await getCategory(body)
          if (status !== 200) return
          if (body) {
            this.secondCategory = data.list
            this.body.second_cat = data.list[0].uuid
            this.event().handleCurrentChange()
            return
          }
          this.fristCategory = data.list
          this.body.first_cat = data.list[0].uuid
          this.event().onFristCategoryChange()
        },
        getCommodityList: async (body) => {
          const { status, data } = await getCommodityList(body)
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        getStandardList: async (body) => {
          const { status, data } = await getStandardList(body)
          if (status !== 200) return
          this.stockDialog = true
          this.gridData = data.list
        },
        setStatus: async (body) => {
          const { status } = await setStatus(body)
          if (status !== 200) return
          this.$notify({
            title: '操作成功',
            message: '上架/下架操作成功',
            type: 'success',
          });
          this.network().getCommodityList(this.body)
        },
        setRecommendation: async (body) => {
          const { status } = await setRecommendation(body)
          if (status !== 200) return
          this.$notify({
            title: '操作成功',
            message: '推荐/取消推荐操作成功',
            type: 'success',
          });
          this.network().getCommodityList(this.body)
        },
        delCommoddity: async (uuid) => {
          const { status } = await delCommoddity(uuid)
          if (status !== 200) return
          this.network().getCommodityList(this.body)
          this.$notify({
            title: '删除成功',
            message: '删除商品成功',
            type: 'success',
          });
        },
      }
    },
    handler() {
      return {
        isDel: (uuid) => {
          this.$confirm('确定删除商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.network().delCommoddity(uuid)
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
