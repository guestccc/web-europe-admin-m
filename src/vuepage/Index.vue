<template>
  <el-container class="full">
    <el-aside width="200px">
      <side-bar>
        <div
          slot="trademark"
          class="title-box">
          <img src="../assets/images/pic_logo2.png">
          <!-- <span>DanKal后台管理</span> -->
        </div>
        <div slot="router">
          <component
            v-for="item in menuList"
            :key="item.name"
            :data="item"
            :is="item.children?'sub-menu':'menu-item'"/>
        </div>
      </side-bar>
    </el-aside>
    <el-main class="no-padding">
      <top-bar/>
      <router-view/>
    </el-main>
  </el-container>
</template>
<script>
/* eslint-disable space-infix-ops */

import TopBar from '../components/top-bar';
import SideBar from '../components/side-bar';
import MenuItem from '../components/side-bar/menu-item'
import SubMenu from '../components/side-bar/sub-menu'
import { pms2MenuList, decrypt } from '../filters/filter'

export default {
  data() {
    return {
      permissionList: [],
      menuList: [],
    };
  },
  components: {
    TopBar,
    SideBar,
    MenuItem,
    SubMenu,
  },
  created() {
    const encryptedPermission = sessionStorage.getItem('permission')
    // 解码并转换成对象格式
    this.permissionList = JSON.parse(decrypt(encryptedPermission))
  },
  mounted() {
    this.menuList = pms2MenuList(this.permissionList)
  },
  methods: {
    event() {
      return {
        onClick() {},
      };
    },

    network() {
      return {
        getListA() {

        },
      };
    },

    handler() {
      return {
        handleListA() {},
      };
    },
  },

  watch: {},

};
</script>

<style>
</style>
