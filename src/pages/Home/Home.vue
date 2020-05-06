<template>
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div class="logo-left">
          <img src="../../../static/logo.jpg" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="primary" @click="loginOut"> 退出登录 </el-button>
      </el-header>
      <!--页面主体区-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="isShow? '64px': '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
                :router="true"
                :collapse-transition="false"
                :collapse="isShow"
                :default-active="active"
                :unique-opened="true"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409bff">
                <!--  分组1  -->
                <el-submenu :index="item.id+ ''" v-for="item in menulist" :key="item.id">
                  <!--  一级菜单的模板区  -->
                  <template slot="title">
                    <!--一级菜单图标文本-->
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                  </template>
                      <!--  二级菜单项  -->
                      <el-menu-item :index="`/${list.path}`" v-for="list in item.children" @click="defaultActive(`/${list.path}`)" :key="list.id">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>{{list.authName}}</span>
                        </template>
                      </el-menu-item>
                </el-submenu>
              </el-menu>
        </el-aside>
        <!--右侧主体-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  props: {},
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isShow: false,
      active: ''
    }
  },
  computed: {
  },
  created () {
    // 请求菜单数据
    this.getMenuList()
    // 读取被选中的active 刷新的时候可以知道之前的状态
    this.active = window.sessionStorage.getItem('active')
  },
  mounted () {
  },
  watch: {},
  components: {},
  methods: {
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse () {
      this.isShow = !this.isShow
    },
    // 请求左侧分类菜单
    async getMenuList () {
      const res = await this.$http.getMenu()
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.menulist = res.data
      this.menulist.iconsObj = this.iconsObj
      // console.log(this.menulist)
    },
    loginOut () {
      window.sessionStorage.clear() // 删除token
      // 跳转路由
      this.$router.replace('/login')
    },
    // 分类菜打开事件
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    }, // 分类菜单关闭
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 保存激活高亮被选中的index
    defaultActive (index) {
      this.active = index
      // 保存到浏览器中
      window.sessionStorage.setItem('active', index)
      // console.log(index)
    }
  },
  filters: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-container{
    width 100%
    height 100%
    min-width 1124px
  }
    .el-header {
      background-color: #373d41;
      color white
      text-align: center;
      line-height: 60px;
      font-size 20px
      display flex;
      justify-content space-between
      .logo-left {
        display flex
        align-items center
        img {
          height 60px
          width 60px
          margin-right 15px
        }
      }
      .el-button {
        height 40px
        margin auto 0
      }
    }

  .el-aside {
    background-color: #333744;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu-item {
      padding-left 70px !important
    }
  }

  .el-main {
    background-color: #eaedf1;
    color: #333;
    text-align: center;
  }
  .iconfont {
    margin-right 10px
  }
  .el-menu {
    border-right: 0
  }
  .toggle-button{
    background-color: #4a5064
    text-align center
    height 24px
    line-height 24px
    color white
    letter-spacing 0.2em
  }
  .toggle-button:hover{
    color palevioletred
    cursor:pointer
  }

</style>
