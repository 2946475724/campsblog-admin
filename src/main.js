import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'  //全局css

import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill' //引入编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import '@/icons' // 引入svg
import '@/permission' // permission control

import moment from 'moment'  //导入时间格式化组件

//定义时间格式化全局过滤器
Vue.filter('dateFormat', (dateStr, pattern='YYYY-MM-DD HH:mm:ss') => {
  return moment(dateStr).format(pattern)
})

Vue.use(ElementUI)
Vue.use(ElementUI,{size:'small'})

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
