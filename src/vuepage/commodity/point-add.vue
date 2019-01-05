<template>
  <el-main class="page-content-margin-unset">
    <div>
      <h3>商品信息</h3>
      <el-form
        :model="body"
        status-icon
        :rules="rules2"
        label-position="left"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="商品编号"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="商品标题"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="商品品牌"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="权重"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="兑换积分数"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="商品原价"
          prop="pass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="库存"
          prop="checkPass">
          <el-input
            type="password"
            v-model="body.input"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="上架"
          prop="age">
          <el-switch
            v-model="body.input"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="dk-from">
      <h3>商品图文</h3>
      <el-form
        :model="body"
        status-icon
        :rules="rules2"
        label-position="left"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="封面图"
          prop="age">
          <el-upload
            @http-request="onImageChange"
            :action="qiniuUploadDomain"
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
        <el-form-item
          label="视频"
          prop="age">
          <el-upload
            @http-request="onImageChange"
            :action="qiniuUploadDomain"
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
        <el-form-item
          label="轮播图"
          prop="age">
          <el-upload
            @http-request="onImageChange"
            :action="qiniuUploadDomain"
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
        <el-form-item
          label="详情图"
          prop="age">
          <el-upload
            @http-request="onImageChange"
            :action="qiniuUploadDomain"
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
            @click="event().onSureClick()">保存</el-button>
          <el-button @click="event().onBackClick()">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>

export default {
  data() {
    return {
      body: {
        input: '',
      },
      rules2: {
        pass: [
          { required: true, message: 'lllll', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: 'lllll', trigger: 'blur' },
        ],
        age: [
          { required: true, message: 'lllll', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
  },
  methods: {
    handleCurrentChange() {
    },
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
        url: this.cdnDomain + response.hash, // url也是必须的
      })
    },
    // 移除图片
    removeImg(file, fileList) {
      this.imglist = fileList // 剩下的文件
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
  .dk-from{
    margin-left: 80px;
  }
}
</style>
