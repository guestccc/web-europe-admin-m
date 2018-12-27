import Container from '@/vuepage/example/index';

import ExampleList from '../vuepage/example/list';
import ExampleEditor from '../vuepage/example/editor';
import MultiPleDownload from '../vuepage/example/multiple-download'
import Operation from '@/vuepage/example/operation-filter'

export default [
  {
    path: '/example-management',
    component: Container,
    children: [
      {
        path: '',
        component: ExampleList,
        meta: [
          {
            name: '样例管理',
            url: '/example-management',
          },
        ],
      },
      {
        path: 'example-editor',
        component: ExampleEditor,
        meta: [
          {
            name: '样例管理',
            url: '/example-management',
          },
          {
            name: '富文本编辑',
            url: '',
          },
        ],
      },
      {
        path: 'multiple-download',
        component: MultiPleDownload,
        meta: [
          {
            name: '样例管理',
            url: '/example-management',
          },
          {
            name: '批量下载',
            url: 'multiple-download',
          },
        ],
      },
      {
        path: 'operation',
        component: Operation,
        meta: [
          {
            name: '样例管理',
            url: '/example-management',
          },
          {
            name: '操作权限控制',
            url: '/operation',
          },
        ],
      },
    ],
  },
];
