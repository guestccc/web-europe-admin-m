<template>
  <el-main class="page-content-margin-unset">
    <!-- 编辑 -->
    <h3>基本信息</h3>
    <div class="detail">
      <img
        src="https://cdn.idalhome.com/Fh1-kbyJ6Sz1IQGVq_ydaL8TQxs1"
        alt="">
      <el-form
        :inline="true"
        :model="body"
        status-icon
        :rules="rules2"
        label-position="left"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="用户昵称"
          prop="priority">
          <el-input v-model.number="body.priority"/>
        </el-form-item>
        <el-form-item
          label="积分ID"
          prop="category_no">
          <el-input
            v-model="body.category_no"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="name">
          <el-input
            v-model="body.name"/>
        </el-form-item>
        <el-form-item
          label="积分余额"
          prop="name">
          <el-input
            v-model="body.name"/>
        </el-form-item>
        <el-form-item
          label="注册时间"
          prop="name">
          <el-input
            v-model="body.name"/>
        </el-form-item>
        <el-form-item
          label="积分明细"
          prop="name">
          <el-button
            type="primary"
            @click="event().onPointDetailClick('ruleForm')">查看明细</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import qiniu from '../../jslib/qiniu'
import { uploadDomain } from '../../configs/env'
import { addCategory, editCategory } from '../../api/commodity'

export default {
  mixins: [qiniu],
  data() {
    return {
      uploadDomain,
      imglist: [],
      imglist2: [],
      body: {
        parent_uuid: this.$route.query.parent_uuid,
        priority: '',
        name: '',
        img_src: '',
        banner_src: '',
        category_no: '',
      },
      rules2: {
        category_no: [
          { required: true, message: '请输入分类编号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        banner_src: [
          { required: true, message: '请输入图片', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请输入图片', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.handler().getDetail()
  },
  methods: {
    event() {
      return {
        onBackClick: () => {
          this.$router.go(-1)
        },
        onPointDetailClick: (uuid) => {
          this.$router.push({ path: 'point-detail', query: { uuid } })
        },
      }
    },
    network() {
      return {
        addCategory: async () => {
          const { status } = await addCategory(this.body)
          if (status !== 200) return
          this.$notify({
            title: '新建成功',
            message: '新建分类成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
        editCategory: async () => {
          const { status } = await editCategory(this.body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑分类成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
      }
    },
    handler() {
      return {
        // 获取详情
        getDetail: () => {
          // 有uuid是编辑
          if (this.$route.query.uuid) {
            this.body = JSON.parse(sessionStorage.getItem('class'))
            this.imglist.push({
              response: {
                hash: this.body.banner_src,
              }, // response里面的hash是必须的
              url: this.imgDomain + this.body.banner_src, // url也是必须的
            })
            this.imglist2.push({
              response: {
                hash: this.body.img_src,
              }, // response里面的hash是必须的
              url: this.imgDomain + this.body.img_src, // url也是必须的
            })
          }
        },
      }
    },
  },
  components: {
  },
};
</script>

<style scoped lang="scss">
.detail{
  display: flex;
}
img{
  min-width: 148px;
  height: 148px;
  border-radius: 6px;
  border: 1px solid #c0ccda;
  margin: 0 20px 20px 0;
}
</style>
