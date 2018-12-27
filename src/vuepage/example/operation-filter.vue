<template>
  <div>
    <el-button
      type="primary"
      v-if="operations.includes('删除')">删除</el-button>
    <el-button
      type="primary"
      v-if="operations.includes('编辑')"
    >编辑</el-button>
    <el-button
      type="primary"
      v-if="operations.includes('导出')">导出</el-button>

  </div>
</template>

<script>
// 需要操作控制的页面都引入这个mixin
import Mixin from '@/mixins/operations'

export default {
  name: 'OperationFilter',
  mixins: [Mixin],
}
</script>

<style scoped>

</style>
