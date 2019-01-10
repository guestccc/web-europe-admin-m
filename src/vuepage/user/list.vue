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
          slot="append"
          @click="handleCurrentChange()"
          icon="el-icon-search"/>
      </el-input>
      <el-date-picker
        v-model="times"
        clearable
        value-format="yyyy-MM-dd"
        @change="onTimeChange()"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="idd"
        label="编号"/>
      <el-table-column
        prop="avatar"
        label="头像"
        width="161">
        <template slot-scope="scope">
          <img
            :src="imgDomain+'/'+scope.row.avatar"
            width="141px">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户昵称"/>
      <el-table-column
        prop="mobile"
        label="手机号码"/>
      <el-table-column
        prop="create_time"
        label="注册时间"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="330">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_banned"
            size="mini"
            type="success"
            class="mini-el-button"
            plain
            @click="event().onBandClick(scope.row)">
            恢复
          </el-button>
          <el-button
            v-else
            size="mini"
            type="danger"
            class="mini-el-button"
            plain
            @click="event().onBandClick(scope.row)">
            禁用
          </el-button>
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row.uuid)">
            用户详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toOrderListClick(scope.row.uuid)">
            用户订单
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
import { getUserList, bandUser } from '../../api/user'
import { imgDomain } from '../../configs/env'
import timeChange from '../../mixins/time-change'
import { setId } from '../../jslib/set-id'

export default {
  mixins: [timeChange],
  data() {
    return {
      imgDomain,
      body: {
        keyword: '',
        page_index: 1,
        page_size: 20,
      },
      times: [],
      total: 0,
      tableData: [
        {},
      ],
    };
  },

  components: {
  },
  created() {
    this.network().getUserList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getUserList()
    },
    event() {
      return {
        toDetailClick: (uuid) => {
          this.$router.push({ path: 'detail', query: { uuid } })
        },
        toOrderListClick: (uuid) => {
          this.$router.push({ path: 'user-order-list', query: { uuid } })
        },
        // eslint-disable-next-line
        onBandClick: ({ uuid, is_banned }) => {
          // eslint-disable-next-line
          this.network().bandUser({ uuid, is_banned: is_banned ? 0 : 1 })
        },
      }
    },
    network() {
      return {
        getUserList: async () => {
          const { status, data } = await getUserList(this.body)
          if (status !== 200) return
          this.tableData = setId(data.data, this.body.page_index, this.body.page_size)
          this.tableData = data.data
          this.total = data.total
        },
        bandUser: async (body) => {
          const { status } = await bandUser(body)
          if (status !== 200) return
          this.network().getUserList()
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
