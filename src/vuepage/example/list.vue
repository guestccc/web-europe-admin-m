<template>
  <section class="container">
    <table-pagination
      :config="config"
      :datasource="datasource"
      @change-page="handlerPageChange">
      <el-table-column
        slot="action"
        fixed="right"
        label="操作"
        width="285"
        align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              plain
              @click="handlerNavigator(scope)">详情</el-button>
          </div>
        </template>
      </el-table-column>
    </table-pagination>
  </section>
</template>

<script>
import TablePagination from '@/components/table-pagination';

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
        total: 1,
        data: [
          {
            name: '富文本编辑器',
            alias: 'editor',
          },
        ],
      },
    };
  },

  components: {
    TablePagination,
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handlerPageChange(data) {
      this.datasource = {
        total: 1,
        data: [
          {
            name: '富文本编辑器',
          },
        ],
      };
    },

    handlerNavigator(scope) {
      this.$router.push({
        path: `/example-management/example-${scope.row.alias}`,
      });
    },
  },
};
</script>

<style scoped>
</style>
