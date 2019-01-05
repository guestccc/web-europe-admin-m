import { getQiniuToken } from '../api/login';
import { imgDomain } from '../configs/env'

export default {
  data() {
    return {
      imgDomain,
      uploadData: {
        token: '',
      },
    };
  },
  created() {
    this.getQiniuToken();
  },
  methods: {
    async getQiniuToken() {
      const { status, data } = await getQiniuToken()
      if (status !== 200) return
      this.uploadData.token = data.token
    },
  },
};
