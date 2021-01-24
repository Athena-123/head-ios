import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组件
import Vant from 'vant';
import 'vant/lib/index.css';

// 引入amfe-flexible模块（改变HTML标签的字体大小）
import 'amfe-flexible'

// 加载全局样式文件
import '@/assets/css/global.css'


// 注册vant组件
Vue.use(Vant);

// 导入时间文件
import '@/utils/day.js'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

