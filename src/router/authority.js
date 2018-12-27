const AuthorityManagement = () => import('@/vuepage/authority/list');

export default [
  {
    path: '/authority-management',
    component: AuthorityManagement,
    meta: [
      {
        name: '管理员管理',
        url: '/authority-management',
      },
      {
        name: '管理员列表',
        url: '/authority-management',
      },
    ],
  },
];
