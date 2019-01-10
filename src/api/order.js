import dkAxios from '@/jslib/dk-axios'

export const getOrderList = data => dkAxios({
  url: '/cms/Order',
  method: 'GET',
  params: data,
});

export const getOrderDetail = data => dkAxios({
  url: `/cms/Order/${data}`,
  method: 'GET',
});
