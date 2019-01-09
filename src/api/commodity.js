import dkAxios from '@/jslib/dk-axios'

// POST: 商品一级分类
export const GetFristCategory = data => dkAxios({
  url: '/cms/Category',
  method: 'GET',
  params: data,
});

// POST: 新增商品分类
export const addCategory = data => dkAxios({
  url: '/cms/Category',
  method: 'POST',
  data,
})

// POST: 编辑商品分类
export const editCategory = data => dkAxios({
  url: `/cms/Category/${data.uuid}`,
  method: 'PUT',
  data,
})

// POST: 删除商品分类
export const delCategory = data => dkAxios({
  url: `/cms/Category/${data}`,
  method: 'DELETE',
})

// POST: 获取商品筛选分类
export const getCategory = data => dkAxios({
  url: '/cms/Product/category',
  method: 'POST',
  params: data,
})

// POST: 获取商品列表
export const getCommodityList = data => dkAxios({
  url: '/cms/Product',
  method: 'GET',
  params: data,
})

// DELETE: 删除商品
export const delCommoddity = data => dkAxios({
  url: `/cms/Product/${data}`,
  method: 'DELETE',
})

// POST: 上下架
export const setStatus = data => dkAxios({
  url: '/cms/Product/statusToggle',
  method: 'POST',
  params: data,
})

// POST: 推荐
export const setRecommendation = data => dkAxios({
  url: '/cms/Product/setRecommendation',
  method: 'POST',
  params: data,
})

// POST：获取规格库存列表
export const getStandardList = data => dkAxios({
  url: '/cms/Product/readStandard',
  method: 'POST',
  params: data,
})

// POST：获取商品详情
export const getCommodityDetail = data => dkAxios({
  url: `/cms/Product/${data}`,
  method: 'GET',
})

// POST: 新增商品
export const addCommodity = data => dkAxios({
  url: '/cms/Product',
  method: 'POST',
  data,
})

// POST: 编辑商品
export const editCommodity = data => dkAxios({
  url: `/cms/Product/${data.uuid}`,
  method: 'PUT',
  data,
})

// 积分===================================


// POST: 获取商品列表
export const getPointProductList = data => dkAxios({
  url: '/cms/PointProduct',
  method: 'GET',
  params: data,
})

// DELETE: 删除商品
export const delPointProduct = data => dkAxios({
  url: `/cms/PointProduct/${data}`,
  method: 'DELETE',
})

// POST: 上下架
export const setPointProductStatus = data => dkAxios({
  url: '/cms/PointProduct/statusToggle',
  method: 'POST',
  params: data,
})


// POST：获取商品详情
export const getPointProductDetail = data => dkAxios({
  url: `/cms/PointProduct/${data}`,
  method: 'GET',
})

// POST: 新增商品
export const addPointProduct = data => dkAxios({
  url: '/cms/PointProduct',
  method: 'POST',
  data,
})

// POST: 编辑商品
export const editPointProduct = data => dkAxios({
  url: `/cms/PointProduct/${data.uuid}`,
  method: 'PUT',
  data,
})
