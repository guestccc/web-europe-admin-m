import SystemManagement from '@/vuepage/system/index';
import SystemAdminList from '../vuepage/system/admin-list';

export default [
  {
    path: '/system-management',
    component: SystemManagement,
    children: [
      {
        path: 'admin-list',
        component: SystemAdminList,
        meta: [
          {
            name: '权限管理',
            url: '/system-management',
          },
          {
            name: '管理员列表',
            url: 'admin-list',
          },
        ],
      },
    ],
  },
];
