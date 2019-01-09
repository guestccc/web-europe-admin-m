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
            @click="event().onAddOrEditClick(scope.row)">
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
            @click="event().onAddOrEditClick(scope.row)">
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
        label-width="180px"
        class="demo-ruleForm">
        <el-form-item
          label="下单限制金额：¥"
          prop="value"
          v-if="body.key == 'order_limit'">
          <el-input-number
            v-model="body.value.money"
            :controls='false'
            :min="1"/>
        </el-form-item>
        <el-form-item
          label="推荐人获得积分比例："
          prop="value"
          v-if="body.key == 'point_proportion'">
          <el-input-number
            v-model="body.value.proportion"
            :controls='false'
            :min="0.1"
            :max="1"/>
        </el-form-item>
        <el-form-item
          label="购买获得积分比例："
          prop="value"
          v-if="body.key == 'point_recommend'">
          <el-input-number
            v-model="body.value.recommend"
            :controls='false'
            :min="0.1"
            :max="1"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="conditionDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="event().onSureClick('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { getConfig, setConfig } from '../../api/content'

export default {
  data() {
    return {
      conditionTitle: '编辑',
      conditionDialog: false,
      body: {
        value: {},
        key: '',
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
      rules2: {
        value: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.network().getConfig({ key: 'order_limit' })
    this.network().getConfigPoint({ key: 'point_proportion' })
  },
  methods: {
    event() {
      return {
        onAddOrEditClick: (item) => {
          this.body.key = item.key
          this.body.value[item.value] = item[item.value]
          this.conditionDialog = true
        },
        onSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 调接口
              this.network().setConfig(this.body)
            } else {
              console.log('error submit!!');
            }
          });
        },
      }
    },
    network() {
      return {
        getConfig: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          data.value.value = 'money'
          data.value.key = 'order_limit'
          this.conditionTable = [data.value]
        },
        getConfigPoint: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          data.value.value = 'proportion'
          data.value.key = 'point_proportion'
          this.pointTable = [data.value]
          this.network().getConfigPoint2({ key: 'point_recommend' })
        },
        getConfigPoint2: async (body) => {
          const { status, data } = await getConfig(body)
          if (status !== 200) return
          data.value.value = 'recommend'
          data.value.key = 'point_recommend'
          this.pointTable.push(data.value)
        },
        setConfig: async (body) => {
          const { status } = await setConfig(body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑成功',
            type: 'success',
          });
          this.network().getConfig({ key: 'order_limit' })
          this.network().getConfigPoint({ key: 'point_proportion' })
          this.conditionDialog = false
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
