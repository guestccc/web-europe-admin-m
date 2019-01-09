<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <div>
        <el-button
          type="primary"
          plain
          @click="event().toAddOrEditClick()">新建轮播图</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="priority"
        label="排序"/>
      <el-table-column
        prop="name"
        label="轮播图名称"/>
      <el-table-column
        label="轮播图"
        width="161">
        <template slot-scope="scope">
          <img
            :src="imgDomain+'/'+scope.row.img_src"
            width="141px">
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
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
        @current-change="handleCurrentChange"
        :current-page.sync="body.page_index"
        :page-size="body.page_size"
        layout="prev, pager, next"
        :total="total"/>
    </div>
  </el-main>
</template>

<script>
import { getBannerList, deleteBanner } from '../../api/content'
import { imgDomain } from '../../configs/env'
import commoonFunction from '../../mixins/common'

export default {
  mixins: [commoonFunction],
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
    this.network().getBannerList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getBannerList()
    },
    event() {
      return {
        toNextListClick: (uuid) => {
          this.$router.push({ path: 'commodity-class-next-list', query: { parent_uuid: uuid } })
        },
        toAddOrEditClick: (uuid) => {
          this.$router.push({ path: 'banner-add', query: { uuid } })
        },
        onDelClick: (uuid) => {
          this.isDel('确定删除轮播图, 是否继续?', 'deleteBanner', uuid)
        },
      }
    },
    network() {
      return {
        getBannerList: async () => {
          const { status, data } = await getBannerList()
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        deleteBanner: async (uuid) => {
          const { status } = await deleteBanner(uuid)
          if (status !== 200) return
          this.network().getBannerList()
          this.$notify({
            title: '删除成功',
            message: '删除轮播图成功',
            type: 'success',
          });
        },
      }
    },
    handler() {
      return {
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
