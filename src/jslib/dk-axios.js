/**
 * Created by IvanCai on 2017/4/19.
 * Modified by Zhi on 2018/7/8.
 */
import axios from 'axios';

import { apiDomain } from '@/configs/env';

/* eslint-disable */
const dkAxios = axios.create({
  baseURL: apiDomain,
  timeout: 10000, // 设置超时时间
});

let loading;
dkAxios.interceptors.request.use(
  (config) => {
    // 访问网络时加载loading,防止用户多次操作
    const token = sessionStorage.getItem('token')

    if (token) {
      config.headers = { 'X-Access-Token': token };
    }

    loading = vm.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    return config;
  },
  error => Promise.reject(error)
  ,
);

dkAxios.interceptors.response.use(
  (response) => {
    loading.close();
    return response;
  },
  (error) => {
    loading.close();
    const { status, data } = error.response;

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
