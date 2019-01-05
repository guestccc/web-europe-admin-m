<template>
  <el-main>
    <!-- 建议使用 router-view -->
    <router-view/>
  </el-main>
</template>

<script>
/* eslint-disable no-unused-vars */

import TablePagination from '@/components/table-pagination';
import QuillEditor from '../../components/quill-editor';

export default {
  data() {
    return {
      config: {
        // pagination: true,
        size: 3,
        fields: [
          {
            prop: 'name',
            label: '名称',
          },
        ],
      },
      datasource: {
        total: 6,
        data: [
          {
            name: 'core',
          },
          {
            name: 'core',
          },
          {
            name: 'core',
          },
        ],
      },
      html: '<p>测试</p>',
    };
  },

  components: {
    TablePagination,
    QuillEditor,
  },

  mounted() {},

  methods: {
    handlerPageChange(data) {
      this.datasource = {
        total: 6,
        data: [
          {
            name: 'dankal',
          },
          {
            name: 'dankal',
          },
          {
            name: 'dankal',
          },
        ],
      };
    },

    handlerTextPage(data) {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    },

    event() {
      return {
        detail(scope) {
          console.log('====================================');
          console.log(scope);
          console.log('====================================');
        },
      };
    },

    handleClick(row) {
    },
  },

  watch: {
    html(nv, ov) {
    },
  },
};
</script>

<style scoped>
</style>
