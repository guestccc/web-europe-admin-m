<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-input
        placeholder="请输入分类名称进行搜索"
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
          @click="event().toAddOrEditClick({})">新建二级分类</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="category_no"
        label="分类编号"/>
      <el-table-column
        prop="priority"
        label="权重"/>
      <el-table-column
        prop="name"
        label="分类名称"/>
      <el-table-column
        prop="img_src"
        label="分类图片"
        width="161">
        <template slot-scope="scope">
          <img
            :src="imgDomain+'/'+scope.row.img_src"
            width="141px">
        </template>
      </el-table-column>
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
import commoonFunction from '../../jslib/common'

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
    this.network().GetFristCategory({ parent_uuid: this.$route.query.parent_uuid })
  },
  methods: {
    handleCurrentChange() {

    },
    event() {
      return {
        toAddOrEditClick: (row) => {
          sessionStorage.setItem('class', JSON.stringify(row))
          this.$router.push({ path: 'commodity-class-add-second', query: { uuid: row.uuid, parent_uuid: this.$route.query.parent_uuid } })
        },
        onDelClick: (uuid) => {
          this.isDel('确定删除分类, 是否继续?', 'delCategory', uuid)
        },
      }
    },
    network() {
      return {
        GetFristCategory: async (body) => {
          const { status, data } = await GetFristCategory(body)
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        delCategory: async (uuid) => {
          const { status } = await delCategory(uuid)
          if (status !== 200) return
          this.network().GetFristCategory({ parent_uuid: this.$route.query.parent_uuid })
          this.$notify({
            title: '删除成功',
            message: '删除二级分类成功',
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
