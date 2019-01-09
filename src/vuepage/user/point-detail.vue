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
        clearable
        @change="onTimeChange()"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-select
        v-model="body.type"
        clearable
        @change="handleCurrentChange()"
        placeholder="按使用类型">
        <el-option
          label="兑换商品"
          value="buy"/>
        <el-option
          label="分享推荐"
          value="share"/>
        <el-option
          label="购买商品"
          value="product"/>
      </el-select>
      <el-select
        clearable
        v-model="body.pay_type"
        @change="handleCurrentChange()"
        placeholder="按交易类型">
        <el-option
          label="收入"
          value="income"/>
        <el-option
          label="支出"
          value="expend"/>
      </el-select>
      <div/>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="idd"
        label="编号"/>
      <el-table-column
        prop="type"
        label="使用类型">
        <template slot-scope="scope">
          <span>{{ types[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_type"
        label="交易类型">
        <template slot-scope="scope">
          <span>{{ payTypes[scope.row.pay_type] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"/>
      <el-table-column
        prop="point"
        label="积分数"/>
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
import { getUserPointDeal } from '../../api/user'
import { setId } from '../../jslib/set-id'
import timeChange from '../../mixins/time-change'

export default {
  mixins: [timeChange],
  data() {
    return {
      types: {
        share: '分享推荐',
        product: '购买商品',
        buy: '兑换商品',
      },
      payTypes: {
        income: '收入',
        expend: '支出',
      },
      body: {
        keyword: '',
        page_index: 1,
        page_size: 20,
        user_uuid: this.$route.query.uuid,
        type: '',
        pay_type: '',
        begin_time: '',
        end_time: '',
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
    this.network().getUserPointDeal()
  },
  methods: {
    handleCurrentChange() {
      this.network().getUserPointDeal()
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
        getUserPointDeal: async () => {
          const { status, data } = await getUserPointDeal(this.body)
          if (status !== 200) return
          this.tableData = setId(data.data, this.body.page_index, this.body.page_size)
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
