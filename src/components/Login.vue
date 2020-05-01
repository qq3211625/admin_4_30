<template>
  <div class="login">
    <div class="shop">
      <!--logo-->
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--表单验证-->
      <el-form class="user" ref="ruleForm" :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="iconfont icon-icon-test1"
            v-model="loginForm.username">
            <!--prop="name"需要匹配的名称-->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-icon-test">
          </el-input>
        </el-form-item>
        <div class="btm">
          <el-button type="primary" @click="loginTo"> 登录 </el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
import { passlogin } from '../api/index'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这个表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号长度在 3 到 10 个字符', trigger: 'blur' },
          { min: 3, max: 10, message: '请输入账号长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginTo () {
      this.$refs.ruleForm.validate(async (valid) => { // 效验成功
        if (valid) {
          // console.log(valid) // 成功为true
          const user = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          // console.log(user)
          const res = await passlogin(user)
          if (res.meta.status !== 200) {
            this.$message.error('账号不存在')
          } else {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // 获取请求头信息存放在sessionstornge
            const token = res.data.token
            window.sessionStorage.setItem('token', token)
            this.$router.push('/home')
          }
        } else { // 效验失败
          // console.log(valid)  失败 false
          this.$message.error('请输入正确的用户信息')
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields() // 重置方法
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: cadetblue;
  .shop {
    box-sizing border-box
    width: 400px;
    height: 300px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .logo {
      /*box-sizing: border-box;*/
      width: 180px;
      height: 180px;
      position: absolute;
      background-color: white;
      padding: 10px;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      img{
        box-sizing: border-box;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: silver;
      }
    }
    .user{
      position absolute
      box-sizing border-box
      padding 20px
      width 100%
      bottom 0
      .btm{
        display: flex;
        justify-content flex-end
      }
    }
  }
}
</style>
