import UserManagement from '@/vuepage/user/index';
import UserList from '../vuepage/user/list';
import UserOrderList from '../vuepage/user/user-order-list';
import UserDetail from '../vuepage/user/detail';
import UserPointDetail from '../vuepage/user/point-detail';

export default [
  {
    path: '/user-management',
    component: UserManagement,
    children: [
      {
        path: 'point-detail',
        component: UserPointDetail,
        meta: [
          {
            name: '用户管理',
            url: '/user-management',
          },
          {
            name: '用户列表',
            url: 'list',
          },
          {
            name: '用户详情',
            url: 'detail',
          },
          {
            name: '积分明细',
            url: 'point-detail',
          },
        ],
      },
      {
        path: 'detail',
        component: UserDetail,
        meta: [
          {
            name: '用户管理',
            url: '/user-management',
          },
          {
            name: '用户列表',
            url: 'list',
          },
          {
            name: '用户详情',
            url: 'detail',
          },
        ],
      },
      {
        path: 'user-order-list',
        component: UserOrderList,
        meta: [
          {
            name: '用户管理',
            url: '/user-management',
          },
          {
            name: '用户列表',
            url: 'list',
          },
          {
            name: '用户订单',
            url: 'user-order-list',
          },
        ],
      },
      {
        path: 'list',
        component: UserList,
        meta: [
          {
            name: '用户管理',
            url: '/user-management',
          },
          {
            name: '用户列表',
            url: 'list',
          },
        ],
      },
    ],
  },
];
