<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-date-picker
        v-model="times"
        type="daterange"
        range-separator="至"
        clearable
        value-format="yyyy-MM-dd"
        @change="onTimeChange()"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-select
        v-model="body.pay_type"
        clearable
        @change="handleCurrentChange()"
        placeholder="支付方式">
        <el-option
          label="支付宝"
          value="2"/>
        <el-option
          label="微信"
          value="1"/>
        <el-option
          label="线下支付"
          value="3"/>
      </el-select>
      <div/>
    </div>
    <el-radio-group
      class="dk-li"
      v-model="body.status"
      @change="handleCurrentChange()">
      <el-radio-button
        :label="item.value"
        v-for="(item,index) in orderArr"
        :key="index">{{ item.label }}</el-radio-button>
    </el-radio-group>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="order_id"
        label="订单号"/>
      <el-table-column
        prop="create_time"
        label="创建时间"/>
      <el-table-column
        prop="name"
        label="用户昵称"/>
      <el-table-column
        prop="mobile"
        label="手机号"/>
      <el-table-column
        prop="money"
        label="订单金额"/>
      <el-table-column
        prop="pay_type"
        label="支付方式">
        <template slot-scope="scope">
          <span>{{ ['','微信','支付宝','线下支付'][scope.row.pay_type] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_time"
        label="支付时间"/>
      <el-table-column
        prop="status"
        label="订单状态"/>
      <el-table-column
        prop="invite_code"
        label="推荐人ID"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row.uuid)">
            详情
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
import { getUserOrderList } from '../../api/user'
import timeChange from '../../mixins/time-change'

export default {
  mixins: [timeChange],
  data() {
    return {
      orderArr: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '待支付',
          value: '待支付',
        },
        {
          label: '待发货',
          value: '待发货',
        },
        {
          label: '待收货',
          value: '待收货',
        },
        {
          label: '已完成',
          value: '已完成',
        },
        {
          label: '已关闭',
          value: '已关闭',
        },
      ],
      body: {
        page_index: 1,
        page_size: 20,
        uuid: this.$route.query.uuid,
        pay_type: '',
        begin_time: '',
        end_time: '',
        status: '',
      },
      times: [],
      total: 0,
      tableData: [
      ],
    };
  },
  created() {
    this.network().getUserOrderList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getUserOrderList()
    },
    event() {
      return {
        toDetailClick: (uuid) => {
          this.$router.push({ path: 'feedback-detail', query: { uuid } })
        },
      }
    },
    network() {
      return {
        getUserOrderList: async () => {
          const { status, data } = await getUserOrderList(this.body)
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
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
