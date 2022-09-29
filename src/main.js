import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import './assets/normalize.css';
import Axios from 'axios';
import plugins from '@/plugins'
Vue.use(plugins); // 安装自己的插件


// 和代理做标识的对应, baseUrl
// Axios.defaults.baseURL = '/api'   需要直接访问public下的menus
Vue.prototype.$ajax = Axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
