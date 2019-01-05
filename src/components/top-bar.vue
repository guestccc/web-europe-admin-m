<template>
  <div class="header-container">
    <div class="router-view">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        separator=">">
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta"
          :key="index">
          <span
            @click="changeRouter(item.url,index)">
            {{ item.name }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="admin-right">
      <img
        class="admin-head"
        width="32px"
        src="../assets/images/dog.jpg">
      <el-dropdown
        @command="signOut"
        trigger="click">
        <span class="el-dropdown-link">
          admin
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <img
              src="../assets/images/logout.png"
              class="dk-icon-back">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },

  created() {},
  computed: {},
  methods: {
    changeRouter(url, index) {
      if (index) {
        console.log(url);
        this.$router.push({ path: url });
      }
    },
    signOut() {
      this.$router.push({ path: '/login' })
    },
  },
};
</script>

<style lang="scss">
.header-container {
  padding:0 57px 0 30px;
  height: 73px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 0;
  .search-row {
    width: 100%;
  }
  .router-view {
  }
  .filter-view {
    display: flex;
    padding-right: 25px;
    align-items: center;
    .type {
      margin: 0 10px;
      color: #223040;
      background: rgba(0, 0, 0, 0);
      margin: 0 15px;
    }
  }
  .admin-right{
    height: 100%;
    display: flex;
    align-items: center;
    .admin-head{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
}
.dk-icon-back {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 12px 12px 0 0;
}

.top-search-input {
  width: 220px;
  margin: 0 10px;
  .search-icon {
    width: 36px !important;
    height: 36px !important;
    padding: 10px 11px !important;
  }
  .search-row {
    margin-bottom: 30px;
  }
}

</style>
