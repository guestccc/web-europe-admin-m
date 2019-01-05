import LogisticsManagement from '@/vuepage/logistics/index';
import LogisticsList from '../vuepage/logistics/list';
import LogisticsAdd from '../vuepage/logistics/add';
import LogisticsDetail from '../vuepage/logistics/detail';

export default [
  {
    path: '/logistics-management',
    component: LogisticsManagement,
    children: [
      {
        path: 'detail',
        component: LogisticsDetail,
        meta: [
          {
            name: '物流管理',
            url: '/logistics-management',
          },
          {
            name: '物流单列表',
            url: 'list',
          },
          {
            name: '物流单详情',
            url: 'detail',
          },
        ],
      },
      {
        path: 'add',
        component: LogisticsAdd,
        meta: [
          {
            name: '物流管理',
            url: '/logistics-management',
          },
          {
            name: '物流单列表',
            url: 'list',
          },
          {
            name: '新增物流单',
            url: 'add',
          },
        ],
      },
      {
        path: 'list',
        component: LogisticsList,
        meta: [
          {
            name: '物流管理',
            url: '/logistics-management',
          },
          {
            name: '物流单列表',
            url: 'list',
          },
        ],
      },
    ],
  },
];
