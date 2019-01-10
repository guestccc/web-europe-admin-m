import StatisticsManagement from '@/vuepage/statistics/index';
import StatisticsOrder from '../vuepage/statistics/order';
import StatisticsIncome from '../vuepage/statistics/income';

export default [
  {
    path: '/statistics-management',
    component: StatisticsManagement,
    children: [
      {
        path: 'order',
        component: StatisticsOrder,
        meta: [
          {
            name: '数据统计',
            url: '/statistics-management',
          },
          {
            name: '订单统计',
            url: 'order',
          },
        ],
      },
      {
        path: 'income',
        component: StatisticsIncome,
        meta: [
          {
            name: '数据统计',
            url: '/statistics-management',
          },
          {
            name: '收入统计',
            url: 'income',
          },
        ],
      },
    ],
  },
];
