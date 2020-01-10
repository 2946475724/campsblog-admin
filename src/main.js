// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'   //引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'

import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {postKeyValueRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
//导入时间格式化组件
import moment from 'moment';
//定义时间格式化全局过滤器
Vue.filter('dateFormat', (dateStr, pattern='YYYY-DD-MM HH:mm:ss') => {
  return moment(dateStr).format(pattern);
});

Vue.use(ElementUI);
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;

Vue.config.productionTip = false;

Vue.use(ElementUI,{size:'small'});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  }else {
    if (window.sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();
    }else{
      next('/?redirect='+to.path);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
