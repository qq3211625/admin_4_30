<template>
  <header class="msite_header">
            <!--<span class="header_search">-->
              <!--<i class="iconfont icon-sousuo"></i>-->
            <!--</span>-->
    <slot name="left"></slot>
            <!--<span class="header_title">-->
                <!--<span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>-->
            <!--</span>-->
    <slot name="content"></slot>
            <!--<span class="header_login">-->
                <!--<span class="header_login_text">登录|注册</span>-->
            <!--</span>-->
    <slot name="right"></slot>

  </header>
</template>

<script>
    export default {

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  header //头部公共css
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .iconfont
        font-size 22px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      font-size 22px
      text-align cente
      .header_title_text
        font-size 20px
        color #fff
        display block
        text-align center
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
</style>
