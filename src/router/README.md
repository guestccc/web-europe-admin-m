# 路由架构

# 路由架构示例

```javascript
import Container from '@/vuepage/example/index';

import ExampleList from '../vuepage/example/list';
import ExampleEditor from '../vuepage/example/editor';

export default [
  {
    path: '/example-management', // 模块路由
    component: Container,
    children: [
      // 侧边栏二级
      {
        path: 'example-list',
        component: ExampleList,
        meta: [
          {
            name: '样例管理',
            url: '/example-management',
          },
          {
            name: '/xx列表',
            url: 'example-list', // 不加斜杠，拼接在父路由后面
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
            name: 'xx列表',
            url: 'example-list',
          },
          {
            name: '富文本编辑',
            url: 'example-editor',
          },
        ],
      },
    ],
  },
];

```

> 1. 相同大模块下所有路由的`meta`属性数组的`第一项`中的`url`，是统一的，用于侧边栏的激活机制

> 2. 相同大模块下 *相同的二级菜单* 路由的，`meta`属性数组的`第二项`中的`url`，是统一的，用于侧边栏的激活机制