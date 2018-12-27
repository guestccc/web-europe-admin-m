<template>
  <el-submenu
    :index="data.route">
    <template slot="title">
      <i :class="data , $route.path | transIcon"/>
      <span>{{ data.name }}</span>
    </template>
    <el-menu-item
      :index="child.route"
      :key="child.route"
      v-for="child in data.children"
    >
      <i :class="child,$route.path | transIcon"/>
      <span slot="title">{{ child.name }}</span>
    </el-menu-item>
  </el-submenu>
</template>

<script>
import MenuItem from './menu-item'

export default {
  name: 'SubMenu',
  filters: {
    transIcon({ route, iconClass }, currentPath) {
      return currentPath === route ? `${iconClass}-active` : iconClass
    },
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  components: { MenuItem },
}
</script>

<style scoped>

</style>
