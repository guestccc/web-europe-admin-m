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
        label="跳转链接"
        prop="category_no">
        <el-input
          v-model="body.category_no"
          autocomplete="off"/>
      </el-form-item>
      <el-form-item
        label="轮播图名称"
        prop="name">
        <el-input
          v-model="body.name"/>
      </el-form-item>
      <el-form-item
        label="轮播图"
        prop="banner_src">
        <el-upload
          @http-request="onImageChange"
          :action="uploadDomain"
          :multiple="false"
          :limit="1"
          :file-list="imglist"
          :on-success="onImageUploadSuccess"
          :on-remove="removeImg"
          :on-exceed="onImageLimited"
          :data="uploadData"
          list-type="picture-card"
          @onchange="onImageChange"
          style="display:inline-block">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
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
    // 覆盖element-ui的上传动作
    onImageChange() {
    },
    // 限制上传图片数量
    onImageLimited() {
      this.$message.error('最多上传一张图片')
    },
    // 图片上传成功的回调
    onImageUploadSuccess(response) {
      this.imglist.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.banner_src = response.hash
    },
    // 移除图片
    removeImg(file, fileList) {
      this.imglist = fileList // 剩下的文件
      this.body.banner_src = fileList[0]
    },

    // 覆盖element-ui的上传动作
    onImageChange2() {
    },
    // 限制上传图片数量
    onImageLimited2() {
      this.$message.error('最多上传一张图片')
    },
    // 图片上传成功的回调
    onImageUploadSuccess2(response) {
      this.imglist2.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.img_src = response.hash
    },
    // 移除图片
    removeImg2(file, fileList) {
      this.imglist2 = fileList // 剩下的文件
      this.body.img_src = fileList[0]
    },
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
                this.network().editCategory()
                return
              }
              this.network().addCategory()
            } else {
              console.log('error submit!!');
            }
          });
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
.page-content-margin-unset{
  display: flex;
}
</style>
