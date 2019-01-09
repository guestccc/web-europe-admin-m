<template>
  <el-main class="page-content-margin-unset">
    <h3>商品信息</h3>
    <div>
      <el-form
        :model="body"
        status-icon
        :rules="rules"
        label-position="left"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="商品编号"
          prop="product_no">
          <el-input
            class="dk-input"
            v-model="body.product_no"/>
        </el-form-item>
        <el-form-item
          label="商品标题"
          prop="title">
          <el-input
            class="dk-input"
            v-model="body.title"/>
        </el-form-item>
        <el-form-item
          label="商品副标题"
          prop="sub_title">
          <el-input
            class="dk-input"
            v-model="body.sub_title"/>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="priority">
          <el-input
            class="dk-input"
            v-model="body.priority"/>
        </el-form-item>
        <el-form-item
          label="兑换积分数"
          prop="point">
          <el-input
            class="dk-input"
            v-model="body.point"/>
        </el-form-item>
        <el-form-item
          label="商品原价￥"
          prop="original_price">
          <el-input
            class="dk-input"
            v-model="body.original_price"/>
        </el-form-item>
        <el-form-item
          label="库存"
          prop="stock">
          <el-input
            class="dk-input"
            v-model="body.stock"/>
        </el-form-item>
        <el-form-item
          label="上架">
          <el-switch
            v-model="body.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1"/>
        </el-form-item>
        <h3>商品图文</h3>
        <el-form-item
          label="封面图"
          prop="img_src">
          <el-upload
            @http-request="onImageChange"
            :action="uploadDomain"
            :multiple="false"
            :limit="1"
            :file-list="imglist"
            :on-success="onImageUploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="removeImg"
            :on-exceed="onImageLimited"
            :data="uploadData"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="dialogImageUrl"
              alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="视频">
          <el-upload
            class="upload-demo"
            :action="uploadDomain"
            :on-change="handleChange"
            :limit="1"
            :on-remove="removeImgVideo"
            :before-upload="beforeAvatarUploadVideo"
            :on-success="onImageUploadSuccessVideo"
            :on-exceed="onImageLimitedVideo"
            :data="uploadData"
            :file-list="videoList">
            <el-button
              size="small"
              type="primary">点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip">只能上传mp4文件，且不超过2mb</div>
          </el-upload>
          <video
            width="148px"
            height="148px"
            controls
            v-if="videoList.length"
            :src="videoList[0].url"/>
        </el-form-item>
        <el-form-item
          label="轮播图"
          prop="img_src_list">
          <el-upload
            :action="uploadDomain"
            :multiple="false"
            :limit="5"
            :file-list="bannerList"
            :on-success="onImageUploadSuccessBanner"
            :on-remove="removeImgBanner"
            :on-preview="handlePictureCardPreview"
            :on-exceed="onImageLimitedBanner"
            :data="uploadData"
            list-type="picture-card"
            style="display:inline-block">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="dialogImageUrl"
              alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="详情图"
          prop="content">
          <el-upload
            :action="uploadDomain"
            :multiple="false"
            :limit="1"
            :file-list="detailList"
            :on-success="onImageUploadSuccessDetail"
            :on-remove="removeImgDetail"
            :on-preview="handlePictureCardPreview"
            :on-exceed="onImageLimitedDetail"
            :data="uploadData"
            :before-upload="beforeAvatarUploadDetail"
            list-type="picture-card"
            style="display:inline-block">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img
              width="100%"
              :src="dialogImageUrl"
              alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="event().onSureClick('ruleForm')">保存</el-button>
          <el-button @click="event().onBackClick()">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import {
  addPointProduct, editPointProduct, getPointProductDetail,
} from '../../api/commodity'
import { uploadDomain } from '../../configs/env'
import qiniu from '../../jslib/qiniu'

export default {
  mixins: [qiniu],
  data() {
    return {
      uploadDomain,
      body: {
        product_no: '',
        title: '',
        sub_title: '',
        priority: '',
        point: '',
        original_price: '',
        stock: '',
        status: 1,
        img_src: '',
        video_src: '',
        img_src_list: [],
        content: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imglist: [],
      videoList: [],
      bannerList: [],
      detailList: [],
      rules: {
        product_no: [
          { required: true, message: '请输入商品编号', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
        ],
        sub_title: [
          { required: true, message: '请输入商品副标题', trigger: 'blur' },
        ],
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        point: [
          { required: true, message: '请输入兑换积分数', trigger: 'blur' },
        ],
        original_price: [
          { required: true, message: '请输入商品原价￥', trigger: 'blur' },
        ],
        stock: [
          { required: true, message: '请输入库存', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请添加封面图', trigger: 'blur' },
        ],
        img_src_list: [
          { required: true, message: '请添加轮播图', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请添加详情图', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (!this.$route.query.uuid) return
    this.network().getPointProductDetail(this.$route.query.uuid)
  },
  methods: {
    event() {
      return {
        onSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (!this.$route.query.uuid) {
                this.network().addPointProduct()
                return
              }
              this.network().editPointProduct()
            } else {
              console.log('error submit!!');
            }
          });
        },
      }
    },
    network() {
      return {
        getPointProductDetail: async (body) => {
          const { status, data } = await getPointProductDetail(body)
          if (status !== 200) return
          this.handler().commodityDetail(data)
        },
        addPointProduct: async () => {
          const { status } = await addPointProduct(this.body)
          if (status !== 200) return
          this.$notify({
            title: '新增成功',
            message: '新增积分商品成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
        editPointProduct: async () => {
          const { status } = await editPointProduct(this.body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑积分商品成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
      }
    },
    handler() {
      return {
        commodityDetail: (data) => {
          this.body = data
          this.imglist = [{ response: { hash: data.img_src }, url: this.imgDomain + data.img_src }]
          this.videoList = data.video_src ? [{ response: { hash: data.video_src }, url: this.imgDomain + data.video_src }] : []
          this.detailList = [{ response: { hash: data.content }, url: this.imgDomain + data.content }]
          data.img_src_list.forEach((item) => {
            this.bannerList.push({ response: { hash: item }, url: this.imgDomain + item })
          })
        },
      }
    },
    handleCurrentChange() {
    },
    // 覆盖element-ui的上传动作
    onImageChange() {
    },
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 封面图
    onImageLimited() {
      this.$message.error('最多上传一张图片')
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    onImageUploadSuccess(response) {
      this.imglist.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.img_src = response.hash
    },
    removeImg(file, fileList) {
      this.imglist = fileList // 剩下的文件
      // eslint-disable-next-line
      this.body.img_src = fileList[0]
    },
    // 视频
    onImageLimitedVideo() {
      this.$message.error('最多上传一张图片')
    },
    handleChange(file, fileList) {
      this.videoList = fileList.slice(-3);
    },
    beforeAvatarUploadVideo(file) {
      const isJPG = file.type === 'video/mp4';
      console.log(file.type, '------------------');

      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传视频只能是mp4格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 10MB!');
      }
      return isLt2M && isJPG;
    },
    onImageUploadSuccessVideo(response) {
      this.videoList.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.video_src = response.hash
    },
    removeImgVideo(file, fileList) {
      this.videoList = fileList // 剩下的文件
      // eslint-disable-next-line
      this.body.video_src = fileList[0]
    },
    // 轮播图
    onImageLimitedBanner() {
      this.$message.error('最多上传五张图片')
    },
    onImageUploadSuccessBanner(response) {
      this.bannerList.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.img_src_list.push(response.hash)
    },
    removeImgBanner(file, fileList) {
      this.bannerList = fileList // 剩下的文件
      this.body.img_src_list = fileList
    },
    // 详情图
    onImageLimitedDetail() {
      this.$message.error('最多上传一张图片')
    },
    beforeAvatarUploadDetail(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    onImageUploadSuccessDetail(response) {
      this.detailList.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.body.content = response.hash
    },
    removeImgDetail(file, fileList) {
      this.detailList = fileList // 剩下的文件
      // eslint-disable-next-line
      this.body.content = fileList[0]
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
