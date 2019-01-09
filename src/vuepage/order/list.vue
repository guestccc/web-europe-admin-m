<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <el-input
        placeholder="请输入用户昵称/手机号/订单号进行搜索"
        v-model="body.keyWord"
        class="input-with-select dk_input">
        <el-button
          slot="append"
          icon="el-icon-search"/>
      </el-input>
      <span style="line-height: 40px;margin-right:10px">创建时间</span>
      <el-date-picker
        style="width:240px"
        v-model="times"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <span style="line-height: 40px;margin-right:10px">兑换时间</span>
      <el-date-picker
        style="width:240px"
        v-model="times"
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
        @change="event().handleCurrentChange()">
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
      @change="event().onSearchChange()">
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
        prop="category_no"
        label="订单号"/>
      <el-table-column
        prop="priority"
        label="创建时间"/>
      <el-table-column
        prop="name"
        label="用户昵称"/>
      <el-table-column
        prop="name"
        label="手机号"/>
      <el-table-column
        prop="name"
        label="订单金额"/>
      <el-table-column
        prop="name"
        label="支付方式"/>
      <el-table-column
        prop="name"
        label="支付时间"/>
      <el-table-column
        prop="name"
        label="订单状态"/>
      <el-table-column
        prop="name"
        label="推荐人ID"/>
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
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row)">
            关闭订单
          </el-button>
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().toDetailClick(scope.row)">
            确认到账
          </el-button>
          <el-button
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
          value: 0,
        },
        {
          label: '待付款',
          value: 1,
        },
        {
          label: '待发货',
          value: 2,
        },
        {
          label: '待收货',
          value: 3,
        },
        {
          label: '已完成',
          value: 4,
        },
        {
          label: '已关闭',
          value: 5,
        },
      ],
      body: {
        keyWord: '',
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
    this.network().getOrderList()
  },
  methods: {
    handleCurrentChange() {

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
