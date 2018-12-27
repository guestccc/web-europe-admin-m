/**
 * Created by IvanCai on 2017/4/19.
 * Modified by Zhi on 2018/7/8.
 */
import axios from 'axios';
import utils from './dk-utils';

import { domain } from './environment';

const dkAxios = axios.create({
  baseURL: domain,
  timeout: 10000, //设置超时时间
});

let loading;
dkAxios.interceptors.request.use(
  function(config) {
    // 访问网络时加载loading,防止用户多次操作
    const token = utils.getCookie('projectName_token');

    if (token) {
      config.headers = { token: token };
    }

    loading = vm.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

dkAxios.interceptors.response.use(
  function(response) {
    loading.close();
    return response;
  },
  function(error) {
    loading.close();
    let { status, data } = error.response;

    switch (status) {
      case 401:
        vm.$router.replace('/login');
        break;
      default:
        vm.$message(data.error.message);
        return Promise.reject(error);
    }
  },
);

export default dkAxios;
