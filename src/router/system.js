import SystemManagement from '@/vuepage/system/index';
import SystemAdminList from '../vuepage/system/admin-list';
import SystemAdminClassList from '../vuepage/system/admin-class';
import SystemAdminClassAdd from '../vuepage/system/admin-class-add';
import SystemAdminLogList from '../vuepage/system/log-list';

export default [
  {
    path: '/system-management',
    component: SystemManagement,
    children: [
      {
        path: 'log-list',
        component: SystemAdminLogList,
        meta: [
          {
            name: '权限管理',
            url: '/system-management',
          },
          {
            name: '操作日志',
            url: 'log-list',
          },
        ],
      },
      {
        path: 'add-class',
        component: SystemAdminClassAdd,
        meta: [
          {
            name: '权限管理',
            url: '/system-management',
          },
          {
            name: '身份列表',
            url: 'admin-class',
          },
          {
            name: '新建身份',
            url: 'add-class',
          },
        ],
      },
      {
        path: 'admin-class',
        component: SystemAdminClassList,
        meta: [
          {
            name: '权限管理',
            url: '/system-management',
          },
          {
            name: '身份列表',
            url: 'admin-class',
          },
        ],
      },
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
