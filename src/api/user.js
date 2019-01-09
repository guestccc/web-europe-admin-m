import dkAxios from '@/jslib/dk-axios'

export const getUserList = data => dkAxios({
  url: '/cms/User',
  method: 'GET',
  params: data,
});

export const getUserDetail = data => dkAxios({
  url: `/cms/User/${data}`,
  method: 'GET',
})

export const getUserPointDeal = data => dkAxios({
  url: '/cms/User/pointDeal',
  method: 'POST',
  params: data,
})

export const bandUser = data => dkAxios({
  url: `/cms/User/${data.uuid}`,
  method: 'PUT',
  data,
})

export const getUserOrderList = data => dkAxios({
  url: '/cms/User/OrderList',
  method: 'POST',
  params: data,
})
