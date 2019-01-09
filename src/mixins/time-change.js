
export default {
  data() {
    return {
    };
  },
  methods: {
    onTimeChange() {
      // eslint-disable-next-line
      const [begin_time, end_time] = this.times?this.times:['','']
      this.body = Object.assign({}, this.body, { begin_time, end_time })
      this.handleCurrentChange()
    },
  },
};
