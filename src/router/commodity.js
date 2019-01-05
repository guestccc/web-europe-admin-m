const commodityManagement = () => import('@/vuepage/commodity/index');
const CommodityDetail = () => import('@/vuepage/commodity/detail');
const CommodityClassList = () => import('@/vuepage/commodity/class-list');
const CommodityClassNextList = () => import('@/vuepage/commodity/class-list-next');
const CommodityClassAdd = () => import('@/vuepage/commodity/class-add');
const CommodityPointList = () => import('@/vuepage/commodity/point-list');
const CommodityPointAdd = () => import('@/vuepage/commodity/point-add');
const CommodityList = () => import('@/vuepage/commodity/list');
const CommodityAdd = () => import('@/vuepage/commodity/commodity-add');

export default [
  {
    path: '/commodity-management',
    component: commodityManagement,
    children: [
      {
        path: 'commodity-add',
        component: CommodityAdd,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '商品列表',
            url: 'commodity-list',
          },
          {
            name: '新增积分商品',
            url: 'commodity-add',
          },
        ],
      },
      {
        path: 'commodity-list',
        component: CommodityList,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '商品列表',
            url: 'commodity-list',
          },
        ],
      },
      {
        path: 'commodity-point-add',
        component: CommodityPointAdd,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '积分商品列表',
            url: 'commodity-point-list',
          },
          {
            name: '新增积分商品',
            url: 'commodity-point-add',
          },
        ],
      },
      {
        path: 'commodity-point-list',
        component: CommodityPointList,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '积分商品列表',
            url: 'commodity-point-list',
          },
        ],
      },
      {
        path: 'commodity-detail',
        component: CommodityDetail,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '商品详情',
            url: 'commodity-detail',
          },
        ],
      },
      {
        path: 'commodity-class-list',
        component: CommodityClassList,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '分类列表',
            url: 'commodity-class-list',
          },
        ],
      },
      {
        path: 'commodity-class-add-frist',
        component: CommodityClassAdd,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '分类列表',
            url: 'commodity-class-list',
          },
          {
            name: '新建一级分类',
            url: 'commodity-class-add-frist',
          },
        ],
      },
      {
        path: 'commodity-class-next-list',
        component: CommodityClassNextList,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '分类列表',
            url: 'commodity-class-list',
          },
          {
            name: '查看下级',
            url: 'commodity-class-next-list',
          },
        ],
      },
      {
        path: 'commodity-class-add-second',
        component: CommodityClassAdd,
        meta: [
          {
            name: '商品管理',
            url: '/commodity-management',
          },
          {
            name: '分类列表',
            url: 'commodity-class-list',
          },
          {
            name: '查看下级',
            url: 'commodity-class-next-list',
          },
          {
            name: '新建二级分类',
            url: 'commodity-class-add-second',
          },
        ],
      },
    ],
  },
];
