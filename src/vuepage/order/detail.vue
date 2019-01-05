<template>
  <el-main class="page-content-margin-unset">
    <h3>订单信息</h3>
    <el-table
      border
      :data="conditionTable">
      <el-table-column
        prop="priority"
        label="订单号"/>
      <el-table-column
        prop="priority"
        label="创建时间"/>
      <el-table-column
        prop="priority"
        label="用户昵称"/>
      <el-table-column
        prop="priority"
        label="手机号"/>
      <el-table-column
        prop="priority"
        label="订单金额"/>
      <el-table-column
        prop="priority"
        label="支付方式"/>
      <el-table-column
        prop="priority"
        label="支付时间"/>
      <el-table-column
        prop="priority"
        label="订单状态"/>
      <el-table-column
        prop="priority"
        label="推荐人ID"/>
    </el-table>
    <h3>收货地址</h3>
    <el-table
      border
      :data="pointTable">
      <el-table-column
        prop="priority"
        label="收货人"/>
      <el-table-column
        prop="priority"
        label="联系电话"/>
      <el-table-column
        prop="priority"
        label="收货地址"/>
    </el-table>
    <h3>商品信息</h3>
    <el-table
      border
      :data="pointTable">
      <el-table-column
        prop="priority"
        label="商品图片"/>
      <el-table-column
        prop="priority"
        label="商品标题"/>
      <el-table-column
        prop="priority"
        label="商品规格"/>
      <el-table-column
        prop="priority"
        label="数量"/>
      <el-table-column
        prop="priority"
        label="商品价格"/>
    </el-table>
    <h3>物流信息</h3>
    <el-table
      border
      :data="pointTable">
      <el-table-column
        prop="priority"
        label="物流单号"/>
      <el-table-column
        prop="priority"
        label="发货时间"/>
      <el-table-column
        prop="priority"
        label="出发地"/>
      <el-table-column
        prop="priority"
        label="目的地"/>
    </el-table>
  </el-main>
</template>

<script>

export default {
  data() {
    return {
      conditionTitle: false,
      conditionDialog: true,
      body: {
        money: '',
      },
      conditionTable: [
        {

        },
      ],
      pointTable: [
        {

        },
        {

        },
      ],
    };
  },
  created() {
  },
  methods: {
    event() {
      return {
      }
    },
    network() {
      return {
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
