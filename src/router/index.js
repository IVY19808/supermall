import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('@/views/home/Home');
const Category = () => import('@/views/category/Category');
const Cart = () => import('@/views/cart/Cart');
const Profile = () => import('@/views/profile/Profile');
const Detail = () => import('@/views/detail/Detail');
// 1.安装插件
Vue.use(VueRouter);
// 2.创建router
const router = new VueRouter({
  routes:[
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/category',
      component: Category,
      // meta: {
      //   keepAlive: true // 需要被缓存
      // }
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/profile',
      component: Profile,
    },
    {
      // 动态路由方式
      path: '/detail/:iid',
      // path: '/detail',
      component: Detail,
    },
  ],
  mode:'history',
})

// 3.导出
export default router