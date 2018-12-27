<style scoped>

</style>

<template>
  <div>
    <el-menu-item
      :index="data.route"
    >
      <i :class="iconClass"/>
      <span slot="title">{{ data.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  computed: {
    iconClass() {
      return this.$route.path === this.data.route ? `${this.data.iconClass}-active` : this.data.iconClass
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
}
</script>
