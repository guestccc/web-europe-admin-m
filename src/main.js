// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router/index';
import 'element-ui/lib/theme-chalk/index.css';
import TopBar from './components/top-bar';
// vuex 配置
import store from './vuex/store';
// quill 富文本编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

require('./filters/vue-filiter')
require('./jslib/verify-code.min');

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 每个页面都需要用的组件可以注册成全局组件，方便每个页面使用
Vue.component('top-bar', TopBar);


/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
/* eslint-disable no-new */
