<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-input
        placeholder="请输入用户昵称/手机号/订单号进行搜索"
        v-model="body.keyword"
        clearable
        @change="handleCurrentChange()"
        class="input-with-select dk_input">
        <el-button
          @click="handleCurrentChange()"
          slot="append"
          icon="el-icon-search"/>
      </el-input>
      <span style="line-height: 40px;margin-right:10px">创建时间</span>
      <el-date-picker
        style="width:240px"
        clearable
        value-format="yyyy-MM-dd"
        @change="onTimeChange()"
        v-model="times"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <span style="line-height: 40px;margin-right:10px">兑换时间</span>
      <el-date-picker
        style="width:240px"
        clearable
        value-format="yyyy-MM-dd"
        @change="onTimeChange1()"
        v-model="times1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <div/>
      <el-select
        class="dk-select"
        v-model="body.is_recommend"
        clearable
        placeholder="支付方式"
        @change="handleCurrentChange()">
        <el-option
          label="支付宝"
          value="1"/>
        <el-option
          label="微信"
          value="2"/>
        <el-option
          label="线下"
          value="3"/>
      </el-select>
      <el-button
        type="primary"
        plain
        @click="event().toDetailClick(scope.row)">
        导出Excel
      </el-button>
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
        width="440">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row.order_uuid)">
            详 情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button">
            关闭订单
          </el-button>
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button">
            确认到账
          </el-button>
          <el-button
            v-if="scope.row.status == '待发货'"
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().onDeliveryClick(scope.row)">
            确认发货
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
      width="480px"
      :title="deliveryTitle"
      :visible.sync="deliveryDialog">
      <el-form
        :model="body"
        label-position="left"
        :rules="rules2"
        ref="ruleForm2"
        label-width="120px"
        class="demo-ruleForm">
        <el-form-item
          label="物流单号："
          prop="priority">
          <el-input
            class="dk-input"
            v-model="body.money"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="deliveryDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="event().onStandardSureClick('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { getOrderList } from '../../api/order'
import { imgDomain } from '../../configs/env'
import commoonFunction from '../../mixins/common'

export default {
  mixins: [commoonFunction],
  data() {
    return {
      deliveryTitle: '确认发货',
      deliveryDialog: false,
      imgDomain,
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
        pay_type: '',
        create_begin_time: '',
        create_end_time: '',
        pay_begin_time: '',
        pay_end_time: '',
        status: '',
        keyword: '',
      },
      times: [],
      times1: [],
      total: 0,
      tableData: [
      ],
      rules2: {
        url: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入轮播图名称', trigger: 'blur' },
        ],
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请输入轮播', trigger: 'blur' },
        ],
      },
    };
  },

  components: {
  },
  created() {
    this.network().getOrderList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getOrderList()
    },
    onTimeChange() {
      // eslint-disable-next-line
      const [create_begin_time, create_end_time] = this.times?this.times:['','']
      this.body = Object.assign({}, this.body, { create_begin_time, create_end_time })
      this.handleCurrentChange()
    },
    onTimeChange1() {
      // eslint-disable-next-line
      const [pay_begin_time, pay_end_time] = this.times1?this.times1:['','']
      this.body = Object.assign({}, this.body, { pay_begin_time, pay_end_time })
      this.handleCurrentChange()
    },
    event() {
      return {
        toDetailClick: (uuid) => {
          this.$router.push({ path: 'detail', query: { uuid } })
        },
        onDeliveryClick: () => {
          this.deliveryDialog = true
        },
      }
    },
    network() {
      return {
        getOrderList: async () => {
          const { status, data } = await getOrderList(this.body)
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
