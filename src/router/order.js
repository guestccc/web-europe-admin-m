import OrderManagement from '@/vuepage/order/index';
import OrderList from '../vuepage/order/list';
// eslint-disable-next-line
import OrderDetail from '../vuepage/order/detail';
import OrderPointList from '../vuepage/order/point-list';
// eslint-disable-next-line
import OrderPointDetail from '../vuepage/order/detail';

export default [
  {
    path: '/order-management',
    component: OrderManagement,
    children: [
      {
        path: 'list',
        component: OrderList,
        meta: [
          {
            name: '订单管理',
            url: '/order-management',
          },
          {
            name: '订单列表',
            url: 'list',
          },
        ],
      },
      {
        path: 'detail',
        component: OrderDetail,
        meta: [
          {
            name: '订单管理',
            url: '/order-management',
          },
          {
            name: '订单列表',
            url: 'list',
          },
          {
            name: '订单详情',
            url: 'detail',
          },
        ],
      },
      {
        path: 'point-list',
        component: OrderPointList,
        meta: [
          {
            name: '订单管理',
            url: '/order-management',
          },
          {
            name: '兑换订单列表',
            url: 'point-list',
          },
        ],
      },
      {
        path: 'point-detail',
        component: OrderPointDetail,
        meta: [
          {
            name: '订单管理',
            url: '/order-management',
          },
          {
            name: '订单列表',
            url: 'point-list',
          },
          {
            name: '订单详情',
            url: 'point-detail',
          },
        ],
      },
    ],
  },
];
