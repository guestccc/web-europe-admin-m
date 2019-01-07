<template>
  <el-main class="page-content-margin-unset">
    <!-- 编辑 -->
    <el-form
      :model="body"
      status-icon
      :rules="rules2"
      label-position="left"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="排序"
        prop="priority">
        <el-input v-model.number="body.priority"/>
      </el-form-item>
      <el-form-item
        label="问题标题"
        prop="title">
        <el-input
          v-model="body.title"
          autocomplete="off"/>
      </el-form-item>
      <div class="dk-form-item">
        <label class="el-form-item__label dk-label">问题回答</label>
        <dk-editor
          class="dk-li"
          :content = "body.content"
          :content-update.sync = "body.content"/>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="event().onSureClick('ruleForm')">保存</el-button>
        <el-button @click="event().onBackClick()">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { uploadDomain } from '../../configs/env'
import { getCommonQuestionDetail, editCommonQuestion, addCommonQuestion } from '../../api/content'
import dkEditor from '../../components/quill-editor'

export default {
  components: {
    dkEditor,
  },
  data() {
    return {
      uploadDomain,
      body: {
        priority: '',
        name: '',
        title: '',
      },
      rules2: {
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入问题标题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入问题回答', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (!this.$route.query.uuid) return
    this.network().getCommonQuestionDetail()
  },
  methods: {
    event() {
      return {
        onBackClick: () => {
          this.$router.go(-1)
        },
        onSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 调接口
              if (this.$route.query.uuid) {
                this.network().editCommonQuestion()
                return
              }
              this.network().addCommonQuestion()
            } else {
              console.log('error submit!!');
            }
          });
        },
      }
    },
    network() {
      return {
        getCommonQuestionDetail: async () => {
          const { status, data } = await getCommonQuestionDetail(this.$route.query.uuid)
          if (status !== 200) return
          this.body = data
        },
        addCommonQuestion: async () => {
          if (!this.handler().verifyInput()) return
          const { status } = await addCommonQuestion(this.body)
          if (status !== 200) return
          this.$notify({
            title: '新建成功',
            message: '新建常见问题成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
        editCommonQuestion: async () => {
          if (!this.handler().verifyInput()) return
          const { status } = await editCommonQuestion(this.body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑常见问题成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
      }
    },
    handler() {
      return {
        verifyInput: () => {
          if (!this.body.content) {
            this.$message({
              message: '请输入问题回答',
              type: 'warning',
            })
            return false
          }
          return true
        },

      }
    },
  },
};
</script>

<style scoped lang="scss">
.page-content-margin-unset{
  display: flex;
}
.dk-form-item{
  display: flex;
  .dk-label{
    width: 100px;
  }
}
</style>
