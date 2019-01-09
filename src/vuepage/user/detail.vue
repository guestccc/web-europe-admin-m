<template>
  <el-main class="page-content-margin-unset">
    <!-- 编辑 -->
    <h3>基本信息</h3>
    <div class="detail">
      <div
        class="img"
        v-if="body.avatar">暂无头像</div>
      <img
        v-else
        class="img"
        :src="body.avatar"
        alt="">
      <el-form
        :inline="true"
        status-icon
        label-position="left"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          class="dk-input"
          label="用户昵称:">
          <span>{{ body.name }}</span>
        </el-form-item>
        <el-form-item
          class="dk-input"
          label="积分ID">
          <span>{{ body.invite_code }}</span>
        </el-form-item>
        <el-form-item
          class="dk-input"
          label="手机号">
          <span>{{ body.mobile }}</span>
        </el-form-item>
        <el-form-item
          class="dk-input"
          label="积分余额">
          <span>{{ body.point }}</span>
        </el-form-item>
        <el-form-item
          class="dk-input"
          label="注册时间">
          <span>{{ body.create_time }}</span>
        </el-form-item>
        <el-form-item
          label="积分明细">
          <el-button
            type="primary"
            @click="event().onPointDetailClick()">查看明细</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import qiniu from '../../jslib/qiniu'
import { uploadDomain } from '../../configs/env'
import { getUserDetail } from '../../api/user'

export default {
  mixins: [qiniu],
  data() {
    return {
      uploadDomain,
      body: {
      },
    };
  },
  created() {
    this.network().getUserDetail()
  },
  methods: {
    event() {
      return {
        onBackClick: () => {
          this.$router.go(-1)
        },
        onPointDetailClick: () => {
          this.$router.push({ path: 'point-detail', query: { uuid: this.$route.query.uuid } })
        },
      }
    },
    network() {
      return {
        getUserDetail: async () => {
          const { status, data } = await getUserDetail(this.$route.query.uuid)
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
.detail{
  display: flex;
}
.img{
  min-width: 148px;
  height: 148px;
  border-radius: 6px;
  border: 1px solid #c0ccda;
  margin: 0 20px 20px 0;
}
</style>
