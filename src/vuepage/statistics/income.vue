<template>
  <div>
    <div class="top-list">
      <div class="item">
        <span>总收入</span>
        <span>￥9,100,000</span>
      </div>
      <div class="item">
        <span>总收入</span>
        <span>￥9,100,000</span>
      </div>
      <div class="item">
        <span>总收入</span>
        <span>￥9,100,000</span>
      </div>
    </div>
    <el-main class="page-content-margin-unset">
      <el-radio-group
        v-model="tabPosition"
        style="margin-bottom: 30px;">
        <el-radio-button label="top">年</el-radio-button>
        <el-radio-button label="right">月</el-radio-button>
        <el-radio-button label="bottom">日</el-radio-button>
      </el-radio-group>
      <div
        ref="orderData"
        style="width: 100%;height:400px;"/>
    </el-main>
  </div>
</template>

<script>
import { imgDomain } from '../../configs/env'
import timeChange from '../../mixins/time-change'

const echarts = require('echarts');

export default {
  mixins: [timeChange],
  data() {
    return {
      imgDomain,
      tabPosition: '',
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
      xAxisData: [],
    };
  },

  components: {
  },
  created() {
  },
  mounted() {
    this.handler().createEchart()
  },
  methods: {
    handleCurrentChange() {
    },
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
        createEchart: () => {
          const option = {
            color: ['#00bb68'],
            title: {
              text: '折线图堆叠',
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['收入统计'],
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                name: '邮件营销',
                type: 'line',
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210],
              },
            ],
          };
          const myChart = echarts.init(this.$refs.orderData)
          myChart.setOption(option)
        },
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-list{
  display: flex;
  margin-bottom: 20px;
  .item{
    flex: 1;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 16px 0 rgba(42, 42, 68, .05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:nth-child(n+2){
      margin-left: 23px;
    }
    span{
      margin-bottom: 12px;
      &:last-child{
        font-size: 36px;
        color: #d70d18;
      }
    }
  }
}
</style>
