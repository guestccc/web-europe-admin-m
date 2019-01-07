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
        <el-input-number
          v-model="body.priority"
          :controls='false'
          :min="1"/>
      </el-form-item>
      <el-form-item
        label="跳转链接"
        prop="url">
        <el-input
          v-model="body.url"
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
        prop="img_src">
        <el-upload
          @http-request="onImageChange"
          :action="uploadDomain"
          :multiple="false"
          :limit="1"
          :file-list="imglist"
          :on-success="onImageUploadSuccess"
          :on-remove="removeImg"
          :on-preview="handlePictureCardPreview"
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
import { addBanner, editBanner, getBannerDetail } from '../../api/content'

export default {
  mixins: [qiniu],
  data() {
    return {
      uploadDomain,
      imglist: [],
      dialogImageUrl: '',
      dialogVisible: false,
      body: {
        parent_uuid: this.$route.query.parent_uuid,
        priority: '',
        name: '',
        img_src: '',
        url: '',
      },
      rules2: {
        url: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入轮播图名称', trigger: 'blur' },
        ],
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请输入轮播', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (!this.$route.query.uuid) return
    this.network().getBannerDetail()
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
      this.body.img_src = response.hash
    },
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 移除图片
    removeImg(file, fileList) {
      this.imglist = fileList // 剩下的文件
      // eslint-disable-next-line
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
                this.network().editBanner()
                return
              }
              this.network().addBanner()
            } else {
              console.log('error submit!!');
            }
          });
        },
      }
    },
    network() {
      return {
        getBannerDetail: async () => {
          const { status, data } = await getBannerDetail(this.$route.query.uuid)
          if (status !== 200) return
          this.body = data
          this.imglist.push({
            response: {
              hash: data.img_src,
            }, // response里面的hash是必须的
            url: this.imgDomain + data.img_src, // url也是必须的
          })
        },
        addBanner: async () => {
          const { status } = await addBanner(this.body)
          if (status !== 200) return
          this.$notify({
            title: '新建成功',
            message: '新建轮播成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
        editBanner: async () => {
          const { status } = await editBanner(this.body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑轮播成功',
            type: 'success',
          });
          this.$router.go(-1)
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
.page-content-margin-unset{
  display: flex;
}
</style>
