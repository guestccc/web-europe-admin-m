<template>
  <el-main class="page-content-margin-unset">
    <h3>订单信息</h3>
    <el-table
      border
      :data="body">
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
        label="支付方式"/>
      <el-table-column
        prop="pay_time"
        label="支付时间"/>
      <el-table-column
        prop="status"
        label="订单状态"/>
      <el-table-column
        prop="invite_code"
        label="推荐人ID"/>
    </el-table>
    <h3>收货地址</h3>
    <el-table
      border
      :data="address">
      <el-table-column
        prop="name"
        label="收货人"/>
      <el-table-column
        prop="mobile"
        label="联系电话"/>
      <el-table-column
        label="收货地址">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.county }}{{ scope.row.detail_address }}</span>
        </template>
      </el-table-column>
    </el-table>
    <h3>商品信息</h3>
    <el-table
      border
      :data="product">
      <el-table-column
        label="商品图片">
        <template slot-scope="scope">
          <img
            width="148px"
            :src="imgDomain + scope.row.img_src"
            alt="">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="product_name"
        label="商品标题"/>
      <el-table-column
        prop="standard_name"
        label="商品规格"/>
      <el-table-column
        prop="quantity"
        label="数量"/>
      <el-table-column
        prop="price"
        label="商品价格"/>
    </el-table>
    <div v-if="status !== '待支付' && status !=='待发货'">
      <h3>物流信息</h3>
      <el-table
        border
        :data="logistics">
        <el-table-column
          prop="logistics_num"
          label="物流单号"/>
        <el-table-column
          prop="delivery_time"
          label="发货时间"/>
        <el-table-column
          prop="origin"
          label="出发地"/>
        <el-table-column
          prop="destination"
          label="目的地"/>
      </el-table>
      <el-table
        border
        :data="logisticsDetail">
        <el-table-column
          prop="time"
          label="时间"/>
        <el-table-column
          prop="address"
          label="当前状态"/>
      </el-table>
    </div>
  </el-main>
</template>

<script>
import { getOrderDetail } from '../../api/order'
import { imgDomain } from '../../configs/env'

export default {
  data() {
    return {
      imgDomain,
      conditionTitle: false,
      conditionDialog: true,
      status: '',
      body: [],
      product: [
      ],
      logistics: [
      ],
      logisticsDetail: [],
      address: [],
    };
  },
  created() {
    this.network().getOrderDetail()
  },
  methods: {
    event() {
      return {
      }
    },
    network() {
      return {
        getOrderDetail: async () => {
          const { status, data } = await getOrderDetail(this.$route.query.uuid)
          if (status !== 200) return
          this.body = [data]
          this.status = data.status
          this.product = data.product
          this.address = [data.address]
          this.logisticsDetail = data.logistics_detail
          this.logistics = [data.logistics]
        },
      }
    },
    handler() {
      return {
      }
    },
  },
  components: {
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixins.scss';
.page-content-margin-unset{
  .dk-from{
    display: flex;
  }
  .table-top{
    @include dk-table-top;
  }
}
</style>
