
export default {
  data() {
    return {
    };
  },
  methods: {
    /**
     *
     * @param {提示信息} string1
     * @param {网路请求方法} functionName
     * @param {请求参数} uuid
     */
    isDel(string1, functionName, uuid) {
      this.$confirm(string1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.network()[functionName](uuid)
          .then(() => {
            if (this.tableData.length === 1 && this.total > 10) {
              this.body.page_index = this.body.page_index - 1
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
};
