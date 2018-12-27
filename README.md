# 后台管理

## 框架目录说明

```cmd
├── build     #webpack配置
├── config    #webpack配置
├── src
│   ├── api     #api接口
│   ├── assets  #资源文件
│   │   ├── images  #图片
│   │   └── styles  #样式
│   │       └── element  #复写element-ui样式
│   ├── components   #只存放全局组件！
│   │   └── side-bar  
│   ├── config       #全局配置文件
│   ├── filters      #全局过滤器
│   ├── jslib        #本地类库集合
│   ├── router       #路由配置
│   ├── vuepage      #页面
│   │   ├── authority
│   │   └── example
│   └── vuex       #全局状态管理
│       └── modules
│           └── authority
└── static       #特殊静态资源

```

## 特别注意事项！

- 请注意 route.js 导入 Vue 组件的路径大小写问题, 如果 vue 页面在目录命名是大写,import 时也必须是大写。否则会引起服务器打包构建失败。
- 如果需要在 npm 仓库添加插件时,请务必使用 npm -S 命令保证 package.json 文件有添加相关依赖

### 贡献代码的步骤

- 在贡献代码之前，你需要 fork 该项目到自己的 github 中，git 项目的地址是 https://github.com/szdankal/web-admin-template.git

- 接着你只需要到 template 下，编码项目即可

### 权限设计说明

- 使用 vuex 和 component 动态组件来加载对应的权限模块
- 同时需要在初始化权限的时候同时初始化对应的路由模块
- 由于是后台管理的缘故， 基本上都是在 Login.vue 里面初始路由

### 组件说明

> side-bar 说明

- 使用动态组件完成对应模块的挂载
- 设计存在两个对应的 slot, 一个是用于定制商标的， 一个是用于存放动态模块的

> quill-editor 说明

- 富文本编辑器

> table-pagination 说明

- pagination 和 table 组合的组件，可以自动生成序号
