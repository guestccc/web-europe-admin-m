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
          label="分类"
          required>
          <div class="dk-from">
            <el-form-item
              prop="first_cat">
              <el-select
                v-model="body.first_cat"
                placeholder="一级分类"
                @change="event().onFristCategoryChange()">
                <el-option
                  v-for="(item, index) in fristCategory"
                  :key="index"
                  :label="item.name"
                  :value="item.uuid"/>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="second_cat">
              <el-select
                v-model="body.second_cat"
                placeholder="二级分类">
                <el-option
                  v-for="(item, index) in secondCategory"
                  :key="index"
                  :label="item.name"
                  :value="item.uuid"/>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item
          label="商品价格￥"
          prop="price">
          <el-input
            class="dk-input"
            v-model="body.price"/>
        </el-form-item>
        <el-form-item
          label="商品原价￥"
          prop="original_price">
          <el-input
            class="dk-input"
            v-model="body.original_price"/>
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
        <el-form-item
          label="推荐">
          <el-switch
            v-model="body.is_recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
        <div class="table-top dk-li">
          <h3>商品规格及库存</h3>
          <div>
            <el-button
              type="primary"
              @click="event().onAddOrEditClick()">添加规格</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table
          border
          :data="body.standard">
          <el-table-column
            prop="priority"
            label="排序"/>
          <el-table-column
            prop="name"
            label="规格"/>
          <el-table-column
            prop="stock"
            label="库存"/>
          <el-table-column
            prop="price"
            label="规格价格￥"/>
          <el-table-column
            label="规格图片">
            <template slot-scope="scope">
              <img
                width="120"
                :src="imgDomain + scope.row.img_src"
                alt="">
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
              <el-button
                size="mini"
                type="danger"
                class="mini-el-button"
                plain
                @click="event().onDelClick(scope.$index)">
                删 除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
          label="视频"
          prop="video_src">
          <el-upload
            class="upload-demo"
            :action="uploadDomain"
            :on-change="handleChange"
            :limit="1"
            :on-remove="removeImgVideo"
            :before-upload="beforeAvatarUpload"
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

    <!-- 添加规格 -->
    <el-dialog
      :title="levelTitle"
      :visible.sync="levelDialog">
      <el-form
        :model="standard"
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
            v-model="standard.priority"/>
        </el-form-item>
        <el-form-item
          label="规 格"
          prop="name">
          <el-input
            class="dk-input"
            v-model="standard.name"/>
        </el-form-item>
        <el-form-item
          label="库 存"
          prop="name">
          <el-input
            class="dk-input"
            v-model="standard.stock"/>
        </el-form-item>
        <el-form-item
          label="规格价格￥"
          prop="price">
          <el-input
            class="dk-input"
            v-model="standard.price"/>
        </el-form-item>
        <el-form-item
          label="规格图片"
          prop="img_src">
          <el-upload
            :action="uploadDomain"
            :multiple="false"
            :limit="1"
            :file-list="standardImgList"
            :on-success="onImageUploadSuccessStandard"
            :on-remove="removeImgStandard"
            :on-preview="handlePictureCardPreview"
            :on-exceed="onImageLimitedStandard"
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
import {
  getCategory, addCommodity, editCommodity, getCommodityDetail,
} from '../../api/commodity'
import { uploadDomain } from '../../configs/env'
import qiniu from '../../jslib/qiniu'

export default {
  mixins: [qiniu],
  data() {
    return {
      uploadDomain,
      levelDialog: false,
      levelTitle: '添加规格',
      body: {
        product_no: '',
        title: '',
        sub_title: '',
        priority: '',
        first_cat: '',
        second_cat: '',
        price: '',
        original_price: '',
        is_recommend: false,
        status: 1,
        img_src: '',
        video_src: '',
        img_src_list: [],
        content: '',
        add_standard: [],
        standard: [],
        delete_standard: [],
      },
      standard: {
        name: '',
        price: '',
        img_src: '',
        priority: '',
        stock: '',
      },
      fristCategory: [],
      secondCategory: [],
      tableData: [],
      // 图片组件用的一些数据
      dialogImageUrl: '',
      dialogVisible: false,
      imglist: [],
      videoList: [],
      bannerList: [],
      detailList: [],
      standardImgList: [],
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
        first_cat: [
          { required: true, message: '请选择二级分类', trigger: 'blur' },
        ],
        second_cat: [
          { required: true, message: '请选择二级分类', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入商品价格￥', trigger: 'blur' },
        ],
        original_price: [
          { required: true, message: '请输入商品原价￥', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请添加封面图', trigger: 'blur' },
        ],
        video_src: [
          { required: true, message: '请添加视频', trigger: 'blur' },
        ],
        img_src_list: [
          { required: true, message: '请添加轮播图', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请添加详情图', trigger: 'blur' },
        ],
      },
      rules2: {
        name: [
          { required: true, message: '请输入规格', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入规格价格￥', trigger: 'blur' },
        ],
        img_src: [
          { required: true, message: '请添加分类图', trigger: 'blur' },
        ],
        priority: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        stock: [
          { required: true, message: '请输入规格库存', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.network().getCategory()
    if (!this.$route.query.uuid) return
    this.network().getCommodityDetail(this.$route.query.uuid)
  },
  methods: {
    event() {
      return {
        onAddOrEditClick: (item = {}) => {
          const newStandard = {
            name: '',
            price: '',
            img_src: '',
            priority: '',
            stock: '',
          }
          // 上传组件默认图
          this.standardImgList = item.img_src
            ? [{ response: { hash: item.img_src }, url: this.imgDomain + item.img_src }]
            : []
          this.standard = JSON.parse(JSON.stringify(item)) || newStandard
          this.levelTitle = item ? '编辑规格' : '新增规格'
          this.levelDialog = true
        },
        onSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.handler().sure()
            } else {
              console.log('error submit!!');
            }
          });
        },
        onStandardSureClick: (formName) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.handler().standardSure()
            } else {
              console.log('error submit!!');
            }
          });
        },
        onFristCategoryChange: () => {
          this.body.second_cat = ''
          this.network().getCategory({ parent_uuid: this.body.first_cat })
        },
        onDelClick: (index) => {
          if (this.body.standard[index].uuid) {
            this.body.delete_standard = [].concat(
              [this.body.standard[index].uuid],
              this.body.delete_standard ? this.body.delete_standard : [],
            )
            this.body.standard = this.body.standard.filter(
              item => item.uuid !== this.body.standard[index].uuid,
            )
          }
        },
      }
    },
    network() {
      return {
        getCommodityDetail: async (body) => {
          const { status, data } = await getCommodityDetail(body)
          if (status !== 200) return
          this.handler().commodityDetail(data)
        },
        getCategory: async (body) => {
          const { status, data } = await getCategory(body)
          if (status !== 200) return
          if (body) {
            this.secondCategory = data.list
            return
          }
          this.fristCategory = data.list
        },
        addCommodity: async () => {
          const { status } = await addCommodity(this.body)
          if (status !== 200) return
          this.$notify({
            title: '新增成功',
            message: '新增商品成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
        editCommodity: async () => {
          const { status } = await editCommodity(this.body)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑商品成功',
            type: 'success',
          });
          this.$router.go(-1)
        },
      }
    },
    handler() {
      return {
        // 编辑/添加规格逻辑
        standardSure: () => {
          this.levelDialog = false
          if (this.standard.uuid) { // 编辑
            this.body.standard = this.body.standard.map((item) => {
              if (item.uuid === this.standard.uuid) {
                return this.standard
              }
              return item
            })
            return
          }
          // 新增
          this.body.standard.push(this.standard)
        },
        // 编辑/新增数据处理
        sure: () => {
          if (this.$route.query.uuid) {
            // 过滤
            this.body.add_standard = this.body.standard.filter(item => !item.uuid)
            this.body.standard = this.body.standard.filter(item => item.uuid)
            this.body.uuid = this.$route.query.uuid
            this.network().editCommodity()
            return
          }
          this.network().addCommodity()
        },
        commodityDetail: (data) => {
          this.network().getCategory({ parent_uuid: data.first_cat })
            .then(() => {
              this.body = data
              this.body.add_standard = []
            })
          this.imglist = [{ response: { hash: data.img_src }, url: this.imgDomain + data.img_src }]
          this.videoList = [{ response: { hash: data.video_src }, url: this.imgDomain + data.video_src }]
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
      const isJPG = file.type === 'mp4';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传视频只能是mp4格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 2MB!');
      }
      return isLt2M;
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
    // 规格图
    onImageLimitedStandard() {
      this.$message.error('最多上传一张图片')
    },
    onImageUploadSuccessStandard(response) {
      this.standardImgList.push({
        response: {
          hash: response.hash,
        }, // response里面的hash是必须的
        url: this.imgDomain + response.hash, // url也是必须的
      })
      this.standard.img_src = response.hash
    },
    removeImgStandard(file, fileList) {
      this.standardImgList = fileList // 剩下的文件
      // eslint-disable-next-line
      this.standard.img_src = fileList[0]
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
