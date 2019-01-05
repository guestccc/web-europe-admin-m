import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import Example from '@/router/example'
import Commodity from '@/router/commodity'
import Content from '@/router/content'
import Logistics from '@/router/logistics'
import User from '@/router/user'
import Order from '@/router/order'
// progress bar style
NProgress.configure({ showSpinner: false });

const Login = () => import('@/vuepage/login');
const Index = () => import('@/vuepage/Index');
const children = [{
  path: '',
  redirect: '/example-management/multiple-download',
}].concat(
  ...Example,
  ...Commodity,
  ...Content,
  ...Logistics,
  ...User,
  ...Order,
)
console.log(Example)
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/index',
      component: Index,
      children,
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  NProgress.done()
})
export default router;
