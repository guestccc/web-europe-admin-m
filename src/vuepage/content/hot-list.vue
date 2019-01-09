<template>
  <el-main class="page-content-margin-unset">
    <div class="table-top dk-li">
      <div>
        <el-button
          type="primary"
          plain
          @click="event().onAddOrEditClick()">新建热门搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      border
      :data="tableData">
      <el-table-column
        prop="priority"
        label="排序"/>
      <el-table-column
        prop="key"
        label="热门搜索词"/>
      <el-table-column
        fixed="right"
        label="管理"
        width="330">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            class="mini-el-button"
            @click="event().onAddOrEditClick(scope.row.uuid)">
            编 辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            class="mini-el-button"
            plain
            @click="event().onDelClick(scope.row.uuid)">
            删 除
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
      :title="hotTitle"
      width="480px"
      :visible.sync="hotDialog">
      <el-form
        :model="addBogy"
        label-position="left"
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="排 序"
          prop="priority">
          <el-input
            class="dk-input"
            v-model="addBogy.priority"/>
        </el-form-item>
        <el-form-item
          label="热门搜索词"
          prop="key">
          <el-input
            class="dk-input"
            v-model="addBogy.key"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="hotDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="event().onSureClick('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import {
  getSearchKeyList, deleteSearchKey, getSearchKeyDetail, addSearchKey, editSearchKey,
} from '../../api/content'
import { imgDomain } from '../../configs/env'
import commoonFunction from '../../mixins/common'

export default {
  mixins: [commoonFunction],
  data() {
    return {
      imgDomain,
      hotTitle: '新增热门搜索',
      hotDialog: false,
      addBogy: {
        priority: '',
        key: '',
      },
      body: {
        keyWord: '',
        page_index: 1,
        page_size: 20,
      },
      total: 0,
      tableData: [
      ],
      rules2: {
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        key: [
          { required: true, message: '请输入热门搜索词', trigger: 'blur' },
        ],
      },
    };
  },

  components: {
  },
  created() {
    this.network().getSearchKeyList()
  },
  methods: {
    handleCurrentChange() {
      this.network().getSearchKeyList()
    },
    event() {
      return {
        onAddOrEditClick: (uuid) => {
          this.addBogy = {
            priority: '',
            key: '',
          }
          if (uuid) {
            this.hotTitle = '编辑热门搜索'
            this.network().getSearchKeyDetail(uuid)
          }
          this.hotTitle = '新增热门搜索'
          this.hotDialog = true
        },
        onSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 调接口
              if (this.body.uuid) {
                this.network().editSearchKey()
                return
              }
              this.network().addSearchKey()
            } else {
              console.log('error submit!!');
            }
          });
        },
        onDelClick: (uuid) => {
          this.isDel('确定删除热门搜索, 是否继续?', 'deleteSearchKey', uuid)
        },
      }
    },
    network() {
      return {
        getSearchKeyList: async (body) => {
          const { status, data } = await getSearchKeyList(body)
          if (status !== 200) return
          this.tableData = data.data
          this.total = data.total
        },
        getSearchKeyDetail: async (uuid) => {
          const { status, data } = await getSearchKeyDetail(uuid)
          if (status !== 200) return
          this.addBogy = data
        },
        addSearchKey: async () => {
          const { status } = await addSearchKey(this.addBogy)
          if (status !== 200) return
          this.$notify({
            title: '新增成功',
            message: '新增热门搜索成功',
            type: 'success',
          });
          this.network().getSearchKeyList(this.body)
          this.hotDialog = false
        },
        editSearchKey: async () => {
          const { status } = await editSearchKey(this.addBogy)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑热门搜索成功',
            type: 'success',
          });
          this.network().getSearchKeyList(this.body)
          this.hotDialog = false
        },
        deleteSearchKey: async (uuid) => {
          const { status } = await deleteSearchKey(uuid)
          if (status !== 200) return
          this.network().getSearchKeyList()
          this.$notify({
            title: '删除成功',
            message: '删除一级分类成功',
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
