<template>
  <el-main class="page-content-margin-unset">
    <h3>条件设置</h3>
    <el-table
      border
      :data="conditionTable">
      <el-table-column
        prop="priority"
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
        prop="priority"
        label="获得积分比例">
        <template slot-scope="scope">
          <span>{{ scope.$index?'购买获得':'推荐获得' }}</span>
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
