// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/font/iconfont.css'

router.beforeEach((to, from, next) => { // 每次路由跳转都会执行的回调
  if (to.path === '/login') { // 去登录页面直接放行
    next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) { // 没有token跳到登录页面
    next('/login')
  } else { // 有token放行
    next()
  }
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
