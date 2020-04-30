<template>
  <div id="app">
    <Header v-show="$route.meta.isoff">
      <span class="header_search" slot="left" v-show="$route.path==='/msite'">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_title" slot="content">
        <span class="header_title_text ellipsis">{{content || '正在获取中...'}}</span>
      </span>
      <span class="header_login" slot="right" v-show="$route.path==='/msite'">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <router-view />
    <FooterGuide v-show="$route.meta.isoff"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import FooterGuide from './conponents/FooterGuide/FooterGuide'
  import Header from './conponents/Header/Header'

  export default {



    async mounted () {
      //根据cookie会话记录,获取用户信息,实现免登陆
      this.$store.dispatch('getUser')//去vuex的所有模块中查找action调用
      //通过经纬度获取用户地址
      this.$store.dispatch('getAddress')
      //获取品类列表
      this.$store.dispatch('getCategorys')
      //根据经纬度获取商铺列表
      this.$store.dispatch('getshops')

    },

    components: {
      FooterGuide,  //这里局部注册
      Header
    },
    computed: {
      ...mapState({
          //     他会传总状态过来
          address: state => state.msite.address
        }),
      content () {
        if(this.$route.path==='/msite'){
          return this.address.name
        }else if(this.$route.path==='/order'){
          return '搜索'
        }else if(this.$route.path==='/profile'){
          return "订单列表"
        }else {
          return "我的"
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative

</style>
