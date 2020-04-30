import Vue from 'vue'
import  App from './App.vue'
import router from './router/index'//引入路由器
import store from './store/index'
import Star from './conponents/Star/Star'
// import CartControl from './conponents/CartControl/CartControl'
import { Button  } from 'mint-ui'
import './validate/index' //加载一个模块,里面代码会在这里执行
import './mock/mock-server'

//         注册组件名  组件模块
Vue.component('Star', Star)
// Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button) //mt-button

new Vue({
  el: '#app', //模板元素
  components: {//全局注册的组件
    App, //注册路由组件

  },
  template: '<App/>',//默认将此模板插入到App中//组件标签,会把组件最外层app覆盖掉
  router,  //配置路由器
  store,
})
