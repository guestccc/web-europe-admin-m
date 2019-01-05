<template>
  <el-row>
    <el-col>
      <el-menu
        :default-active="$route.meta[0].url+'/'+$route.meta[1].url"
        :router="routerMode"
        class="el-menu-vertical-demo full-height"
        background-color="#141414"
        text-color="#666666"
        active-text-color="#ffffff"
      >
        <slot name="trademark"/>
        <slot name="router"/>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      routerMode: true,
    };
  },
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}

.el-menu {
  overflow: hidden;
  overflow-y: auto;
}
</style>
