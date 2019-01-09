<template>
  <el-main class="page-content-margin-unset">
    <!-- 编辑 -->
    <el-form
      status-icon=""
      label-position="left"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="用户昵称">
        <span>{{ body.username }}</span>
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="category_no">
        <span>{{ body.mobile }}</span>
      </el-form-item>
      <el-form-item
        label="提交时间"
        prop="name">
        <span>{{ body.create_time }}</span>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="banner_src">
        <span>{{ body.is_read }}</span>
      </el-form-item>
      <el-form-item
        label="文字"
        prop="banner_src">
        <span>{{ body.content }}</span>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="banner_src">
        <img
          width="148px"
          v-for="(item,index) in body.img_src_list"
          :key="index"
          :src="imgDomain + item"
          alt="">
      </el-form-item>
      <el-form-item>
        <el-button @click="event().onBackClick()">返 回</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import qiniu from '../../jslib/qiniu'
import { imgDomain } from '../../configs/env'
import { getFeedbackDetail } from '../../api/content'

export default {
  mixins: [qiniu],
  data() {
    return {
      imgDomain,
      body: {
      },
    };
  },
  created() {
    this.network().getFeedbackDetail()
  },
  methods: {
    event() {
      return {
        onBackClick: () => {
          this.$router.go(-1)
        },
      }
    },
    network() {
      return {
        getFeedbackDetail: async () => {
          const { status, data } = await getFeedbackDetail(this.$route.query.uuid)
          if (status !== 200) return
          this.body = data
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
