> 样例代码

```vue
<template>
  <el-container class="full-height bg-gray">
    <el-header class="no-padding">
      <top-bar>
        <!--通过slot拓展的筛选项-->
        <div slot="filter">
          <el-button>1</el-button>
          <el-button>2</el-button>
          <el-button>3</el-button>
        </div>
      </top-bar>
    </el-header>
    <el-main class="page-content">
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},

  watch: {},

  computed: {},
};
</script>

<style scoped>
</style>
```
