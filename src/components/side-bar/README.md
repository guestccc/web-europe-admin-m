# 侧边栏架构

# 激活机制说明

```html
// index.vue
  <el-row>
    <el-col>
      <el-menu
        :default-active="$route.meta[0].url+'/'+$route.meta[1].url"
        :router="routerMode"
        class="el-menu-vertical-demo full-height"
        background-color="#141414"
        text-color="#666666"
        active-text-color="#ffffff"
      >
        <slot name="trademark"/>
        <slot name="router"/>
      </el-menu>
    </el-col>
  </el-row>

```

```html
// sub-menu.vue
    <el-menu-item
      :index="child.route"
      :key="child.route"
      v-for="child in data.children"
    >
      <i :class="child,$route.meta | transIcon"/>
      <span slot="title">{{ child.name }}</span>
    </el-menu-item>
```

> `index.vue`中的default-active  等于  `sub-menu.vue`中的`index`,**侧边栏激活**

# 示例

`$route.meta[0].url` 为模块路由，`/xxxx-management`

`$route.meta[1].url` 为二级模块路由, `/xxxx-list` 或者 `/xxxx-detail`  ...

那么`default-active`等于`$route.meta[0].url+'/'+$route.meta[1].url` 等于 `/xxxx-management/xxxx-list`

所有`index` 等于 `child.route` 等于`/xxxx-management/xxxx-list`时，对应的侧边栏才会激活

所以需要在`/configs/permission-mapper.js`中配置一下侧边栏跳转路由路由


