
const list = [
  {
    name: '管理员列表',
    menuItem: {
      name: '管理员列表',
      iconClass: 'dk-icon-home',
      route: '/system-management/admin-list',
    },
  },
  {
    name: '权限管理',
    menuItem: {
      name: '权限管理',
      iconClass: 'dk-icon-home',
      route: '/system-management',
    },
  },
  {
    name: '兑换订单列表',
    menuItem: {
      name: '兑换订单列表',
      iconClass: 'dk-icon-home',
      route: '/order-management/point-list',
    },
  },
  {
    name: '订单列表',
    menuItem: {
      name: '订单列表',
      iconClass: 'dk-icon-home',
      route: '/order-management/list',
    },
  },
  {
    name: '订单管理',
    menuItem: {
      name: '订单管理',
      iconClass: 'dk-icon-home',
      route: '/order-management',
    },
  },
  {
    name: '用户列表',
    menuItem: {
      name: '用户列表',
      iconClass: 'dk-icon-home',
      route: '/user-management/list',
    },
  },
  {
    name: '用户管理',
    menuItem: {
      name: '用户管理',
      iconClass: 'dk-icon-home',
      route: '/user-management',
    },
  },
  {
    name: '物流单列表',
    menuItem: {
      name: '物流单列表',
      iconClass: 'dk-icon-home',
      route: '/logistics-management/list',
    },
  },
  {
    name: '物流管理',
    menuItem: {
      name: '物流管理',
      iconClass: 'dk-icon-home',
      route: '/logistics-management',
    },
  },
  {
    name: '条件设置',
    menuItem: {
      name: '条件设置',
      iconClass: 'dk-icon-home',
      route: '/content-management/condition-list',
    },
  },
  {
    name: '意见反馈',
    menuItem: {
      name: '意见反馈',
      iconClass: 'dk-icon-home',
      route: '/content-management/feedback-list',
    },
  },
  {
    name: '热门搜索',
    menuItem: {
      name: '热门搜索',
      iconClass: 'dk-icon-home',
      route: '/content-management/hot-list',
    },
  },
  {
    name: '常见问题',
    menuItem: {
      name: '常见问题',
      iconClass: 'dk-icon-home',
      route: '/content-management/problem-list',
    },
  },
  {
    name: '关于我们',
    menuItem: {
      name: '关于我们',
      iconClass: 'dk-icon-home',
      route: '/content-management/about',
    },
  },
  {
    name: '轮播图管理',
    menuItem: {
      name: '轮播图管理',
      iconClass: 'dk-icon-home',
      route: '/content-management/banner-list',
    },
  },
  {
    name: '内容管理',
    menuItem: {
      name: '内容管理',
      iconClass: 'dk-icon-home',
      route: '/content-management',
    },
  },
  {
    name: '商品列表',
    menuItem: {
      name: '商品列表',
      iconClass: 'dk-icon-home',
      route: '/commodity-management/commodity-list',
    },
  },
  {
    name: '积分商品列表',
    menuItem: {
      name: '积分商品列表',
      iconClass: 'dk-icon-home',
      route: '/commodity-management/commodity-point-list',
    },
  },
  {
    name: '分类列表',
    menuItem: {
      name: '分类列表',
      iconClass: 'dk-icon-home',
      route: '/commodity-management/commodity-class-list',
    },
  },
  {
    name: '商品详情',
    menuItem: {
      name: '商品详情',
      iconClass: 'dk-icon-home',
      route: '/commodity-management/commodity-detail',
    },
  },
  {
    name: '商品管理',
    menuItem: {
      name: '商品管理',
      iconClass: 'dk-icon-home',
      route: '/commodity-management',
    },
  },
  {
    name: '样例管理',
    menuItem: {
      name: '样例管理',
      iconClass: 'dk-icon-home',
      route: '/example-management',
    },
  },
  {
    name: 'xx列表',
    menuItem: {
      name: 'xx列表',
      iconClass: 'dk-icon-order',
      route: '/example-management/example-list',
    },
  },
  {
    name: '批量下载',
    menuItem: {
      name: '批量下载',
      iconClass: 'dk-icon-order',
      route: '/example-management/multiple-download',
    },
  },
  {
    name: '操作权限控制',
    menuItem: {
      name: '操作权限控制',
      iconClass: 'dk-icon-order',
      route: '/example-management/operation',
    },
  },
]

const mapper = new Map()
list.forEach((value) => {
  mapper.set(value.name, value.menuItem)
})

export default mapper
