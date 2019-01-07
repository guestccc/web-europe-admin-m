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
        label="身份名称"
        prop="priority">
        <el-input v-model.number="body.priority"/>
      </el-form-item>
      <el-form-item
        label="管理模块"
        prop="category_no">
        <el-tree
          :data="powerTree"
          show-checkbox
          node-key="uuid"
          ref="tree"
          :props="defaultProps"/>
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
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      powerTree: [
        {
          uuid: '1',
          name: '用户管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '10',
              name: '用户列表',
              parent_uuid: '1',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '100',
              name: '会员设置',
              parent_uuid: '1',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '11',
          name: '合伙人管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '110',
              name: '合伙人列表',
              parent_uuid: '11',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1100',
              name: '提现管理',
              parent_uuid: '11',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11000',
              name: '收益设置',
              parent_uuid: '11',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '111',
          name: '订单管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '1110',
              name: '新零售订单管理',
              parent_uuid: '111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11100',
              name: '新零售售后订单',
              parent_uuid: '111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '111000',
              name: '积分订单管理',
              parent_uuid: '111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1110000',
              name: '积分售后订单',
              parent_uuid: '111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '1111',
          name: '商品管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '11110',
              name: 'erp商品库',
              parent_uuid: '1111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '111100',
              name: '新零售商品列表',
              parent_uuid: '1111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111000',
              name: '积分商品列表',
              parent_uuid: '1111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '11111',
          name: '交易管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '111110',
              name: '交易列表',
              parent_uuid: '11111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111100',
              name: '积分设置',
              parent_uuid: '11111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11111000',
              name: '运费设置',
              parent_uuid: '11111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '111111',
          name: '类目管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '1111110',
              name: '类目列表',
              parent_uuid: '111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '1111111',
          name: '内容管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '11111110',
              name: '轮播图管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '111111100',
              name: '广告位管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111111000',
              name: '消息推送管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11111110000',
              name: '活动管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '111111100000',
              name: '签到管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111111000000',
              name: '知识库',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11111110000000',
              name: '意见反馈管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '111111100000000',
              name: '公告管理',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111111000000000',
              name: '关于我们',
              parent_uuid: '1111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '11111111',
          name: '系统管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '111111110',
              name: '权限管理',
              parent_uuid: '11111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111111100',
              name: '系统收货地址管理',
              parent_uuid: '11111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '111111111',
          name: '优惠券管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [],
        },
        {
          uuid: '1111111111',
          name: '二维码管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '11111111110',
              name: '二维码列表',
              parent_uuid: '1111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '11111111111',
          name: '停车管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '111111111110',
              name: '停车记录',
              parent_uuid: '11111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '1111111111100',
              name: '停车优惠券',
              parent_uuid: '11111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '111111111111',
          name: '数据管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '1111111111110',
              name: '数据信息',
              parent_uuid: '111111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
            {
              uuid: '11111111111100',
              name: '数据分析',
              parent_uuid: '111111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
        {
          uuid: '1111111111111',
          name: '供应商管理',
          parent_uuid: '0',
          controller: '',
          action: '',
          sequence: 0,
          children: [
            {
              uuid: '11111111111110',
              name: '供应商列表',
              parent_uuid: '1111111111111',
              controller: '',
              action: '',
              sequence: 0,
              children: [],
            },
          ],
        },
      ],
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
