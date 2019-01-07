<template>
  <el-main class="page-content-margin-unset">
    <!-- 编辑 -->
    <div>
      <dk-editor
        class="dk-li"
        :content = "add.value.content"
        :content-update.sync = "add.value.content"/>
      <el-button
        class=""
        type="primary"
        @click="event().onSureClick()">保存</el-button>
    </div>
  </el-main>

</template>

<script>
import dkEditor from '../../components/quill-editor'
import { addAbout, getAbout } from '../../api/content'

export default {
  data() {
    return {
      add: {
        value: { content: '' },
      },
    };
  },
  created() {
    this.network().getAbout()
  },
  methods: {
    event() {
      return {
        onSureClick: () => {
          this.network().addAbout(this.add)
        },
      }
    },
    network() {
      return {
        addAbout: async (add) => {
          if (!this.handler().verifyInput()) return
          const { status } = await addAbout(add)
          if (status !== 200) return
          this.$notify({
            title: '编辑成功',
            message: '编辑关于我们成功',
            type: 'success',
          });
          this.network().getAbout()
        },
        getAbout: async () => {
          const { status, data } = await getAbout()
          if (status !== 200) return
          this.add = data
        },
      }
    },
    handler() {
      return {
        verifyInput: () => {
          if (!this.add.value.content) {
            this.$message({
              message: '请输入内容',
              type: 'warning',
            })
            return false
          }
          return true
        },
      }
    },
  },
  components: {
    dkEditor,
  },
};
</script>

<style scoped lang="scss">
.page-content-margin-unset{
  display: flex;
}
</style>
