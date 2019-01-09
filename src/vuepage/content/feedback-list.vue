<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-input
        placeholder="请输入分类名称进行搜索"
        v-model="body.keyword"
        clearable
        @change="handleCurrentChange()"
        class="input-with-select dk_input">
        <el-button
          @click="handleCurrentChange()"
          slot="append"
          icon="el-icon-search"/>
      </el-input>
      <el-date-picker
        v-model="times"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        value-format="yyyy-MM-dd"
        @change="onTimeChange()"
        end-placeholder="结束日期"/>
      <el-select
        class="dk-select"
        v-model="body.is_read"
        clearable
        @change="handleCurrentChange()">
        <el-option
          label="已读"
          :value="1"/>
        <el-option
          label="未读"
          :value="0"/>
      </el-select>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        type="index"
        label="编号"/>
      <el-table-column
        prop="img_src"
        label="头像"
        width="161">
        <template slot-scope="scope">
          <img
            :src="imgDomain+'/'+scope.row.avatar"
            width="141px">
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户昵称"/>
      <el-table-column
        prop="mobile"
        label="手机号码"/>
      <el-table-column
        prop="create_time"
        label="提交时间"/>
      <el-table-column
        prop="is_read"
        label="状态">
        <template slot-scope="scope">
          <span>{{ ['未读','已读'][scope.row.is_read] }}</span>
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
            @click="event().toDetailClick(scope.row.uuid)">
            查看详情
          </el-button>
          <el-button
            size="mini"
            type="danger"
            class="mini-el-button"
            plain
            v-if="!scope.row.is_read"
            @click="event().onChangeReadClick(scope.row.uuid)">
            设为已读
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
import { getFeedbackList, changeFeedback } from '../../api/content'
import { imgDomain } from '../../configs/env'
import timeChange from '../../mixins/time-change'

export default {
  mixins: [timeChange],
  data() {
    return {
      imgDomain,
      body: {
        keyword: '',
        page_index: 1,
        page_size: 20,
        begin_time: '',
        end_time: '',
        is_read: '',
      },
      times: [],
      total: 0,
      tableData: [
      ],
    };
  },

  components: {
  },
  created() {
    this.network().getFeedbackList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getFeedbackList()
    },
    event() {
      return {
        toDetailClick: (uuid) => {
          this.$router.push({ path: 'feedback-detail', query: { uuid } })
        },
        onChangeReadClick: (uuid) => {
          this.network().changeFeedback(uuid)
        },
      }
    },
    network() {
      return {
        getFeedbackList: async () => {
          const { status, data } = await getFeedbackList(this.body)
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        changeFeedback: async (uuid) => {
          const { status } = await changeFeedback(uuid)
          if (status !== 200) return
          this.$notify({
            title: '设置成功',
            message: '设置为已读成功',
            type: 'success',
          });
          this.network().getFeedbackList()
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
