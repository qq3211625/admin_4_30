<template>
  <div>
    <div>你好</div>
    <el-button type="primary" @click="loginOut"> 退出登录 </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {},
  data () {
    return {}
  },
  computed: {},
  mounted () {

  },
  watch: {},
  components: {},
  methods: {
    loginOut () {
      window.sessionStorage.clear() // 删除token
      // 跳转路由
      this.$router.replace('/login')
    }
  },
  filters: {}
}
</script>

<style scoped>

</style>
