import dkAxios from '@/jslib/dk-axios'
// POST: 登陆
export const login = data => dkAxios({
  url: '/cms/Admin/login',
  method: 'POST',
  params: data,
});

// GET： 获取七牛token
export const getQiniuToken = () => dkAxios({
  url: '/app/config/qiniu',
  method: 'GET',
})
