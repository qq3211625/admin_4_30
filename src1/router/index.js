//路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'

Vue.use(VueRouter) //声明使用路由器

export default new VueRouter({ //创建路由器
  routes, //配置路由
  mode: 'hash', //hash: 带# history:  不带#
})
