import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast'

import FastClick from 'fastclick'

Vue.config.productionTip = false
// 安装toast插件 调用toast对象的install
Vue.use(toast);
// 解决移动端300ms延迟
FastClick.attach(document.body);
// 给Vue的原型对象添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
