import dkAxios from '@/jslib/dk-axios'

export const getBannerList = () => dkAxios({
  url: '/cms/Banner',
  method: 'GET',
});

export const addBanner = data => dkAxios({
  url: '/cms/Banner',
  method: 'POST',
  data,
})

export const editBanner = data => dkAxios({
  url: `/cms/Banner/${data.uuid}`,
  method: 'PUT',
  data,
})

export const getBannerDetail = data => dkAxios({
  url: `/cms/Banner/${data}`,
  method: 'GET',
})

export const deleteBanner = data => dkAxios({
  url: `/cms/Banner/${data}`,
  method: 'DELETE',
})

export const getAbout = () => dkAxios({
  url: '/cms/Config/about_us',
  method: 'GET',
})

export const addAbout = data => dkAxios({
  url: '/cms/Config/about_us',
  method: 'PUT',
  data,
})

export const getCommonQuestionList = () => dkAxios({
  url: '/cms/CommonQuestion',
  method: 'GET',
});

export const addCommonQuestion = data => dkAxios({
  url: '/cms/CommonQuestion',
  method: 'POST',
  data,
})

export const editCommonQuestion = data => dkAxios({
  url: `/cms/CommonQuestion/${data.uuid}`,
  method: 'PUT',
  data,
})

export const getCommonQuestionDetail = data => dkAxios({
  url: `/cms/CommonQuestion/${data}`,
  method: 'GET',
})

export const deleteCommonQuestion = data => dkAxios({
  url: `/cms/CommonQuestion/${data}`,
  method: 'DELETE',
})

export const getSearchKeyList = () => dkAxios({
  url: '/cms/SearchKey',
  method: 'GET',
});

export const addSearchKey = data => dkAxios({
  url: '/cms/SearchKey',
  method: 'POST',
  data,
})

export const editSearchKey = data => dkAxios({
  url: `/cms/SearchKey/${data.uuid}`,
  method: 'PUT',
  data,
})

export const getSearchKeyDetail = data => dkAxios({
  url: `/cms/SearchKey/${data}`,
  method: 'GET',
})

export const deleteSearchKey = data => dkAxios({
  url: `/cms/SearchKey/${data}`,
  method: 'DELETE',
})


export const getConfig = data => dkAxios({
  url: '/cms/Config/order_limit',
  method: 'GET',
  params: data,
})


export const setConfig = data => dkAxios({
  url: '/cms/Config/order_limit',
  method: 'PUT',
  data,
})

export const getFeedbackList = data => dkAxios({
  url: '/cms/Feedback',
  method: 'GET',
  params: data,
});

export const getFeedbackDetail = data => dkAxios({
  url: `/cms/Feedback/${data}`,
  method: 'GET',
});

export const changeFeedback = data => dkAxios({
  url: `/cms/Feedback/${data}`,
  method: 'PUT',
});
