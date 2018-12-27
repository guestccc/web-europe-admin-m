
export default {
  computed: {
    operations() {
      const moduleName = this.$route.meta[0].name
      let operationList = []
      this.$store.state.base.operationMap.forEach((value) => {
        if (value.name === moduleName) {
          operationList = value.operations
        }
      })
      return operationList
    },
  },
}
