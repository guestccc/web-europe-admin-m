<template>
  <el-main class="page-content-margin-unset">
    <h3>条件设置</h3>
    <el-table
      border
      :data="conditionTable">
      <el-table-column
        prop="money"
        label="下单限制金额"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().onAddOrEditClick(scope.row,scope.$index)">
            编 辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3>积分比例设置</h3>
    <el-table
      border
      :data="pointTable">
      <el-table-column
        label="获得积分比例">
        <template slot-scope="scope">
          <span>{{ scope.row.proportion?`购买获得${scope.row.proportion}`:`推荐获得${scope.row.recommend}` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().onAddOrEditClick(scope.row,scope.$index)">
            编 辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加规格 -->
    <el-dialog
      width="480px"
      :title="conditionTitle"
      :visible.sync="conditionDialog">
      <el-form
        :model="body"
        label-position="left"
        :rules="rules2"
        ref="ruleForm2"
        label-width="120px"
        class="demo-ruleForm">
        <el-form-item
          label="下单限制金额：¥"
          prop="priority">
          <el-input
            class="dk-input"
            v-model="body.money"/>
          <span>%</span>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="levelDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="event().onStandardSureClick('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { getConfig } from '../../api/content'

export default {
  data() {
    return {
      conditionTitle: false,
      conditionDialog: false,
      body: {
        money: '',
      },
      conditionTable: [
        {
          money: 0,
        },
      ],
      pointTable: [
        {
          proportion: 0,
        },
      ],
    };
  },
  created() {
    this.network().getConfig({ key: 'order_limit' })
    this.network().getConfigPoint({ key: 'point_proportion' })
  },
  methods: {
    event() {
      return {
      }
    },
    network() {
      return {
        getConfig: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          this.conditionTable = [data.value]
        },
        getConfigPoint: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          this.pointTable = [data.value]
          this.network().getConfigPoint2({ key: 'point_recommend' })
        },
        getConfigPoint2: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          this.pointTable.push(data.value)
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
