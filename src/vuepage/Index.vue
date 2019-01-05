<template>
  <el-container class="full">
    <!-- 侧边 -->
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
    <el-container class="full-height bg-gray">
      <!-- 头部 -->
      <el-header
        class="no-padding"
        style="height:73px">
        <top-bar/>
      </el-header>
      <!-- 主体 -->
      <router-view/>
    </el-container>
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
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      permissionList: [],
      menuList: [],
      tableData: Array(20).fill(item),
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
