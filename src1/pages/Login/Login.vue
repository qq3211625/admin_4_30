<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
                                        <!--设置下划线               点击显示隐藏-->
          <a href="javascript:;" :class="{on: isShowSms }" @click="isShowSms=true" >短信登录</a>
          <a href="javascript:;" :class="{on: !isShowSms }" @click="isShowSms=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowSms }" v-if="isShowSms">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"
                     name="phone" v-validate="{required: true,regex: /^1\d{10}$/}">
              <span style="color: red;" >{{ errors.first('phone') }}</span>

              <button :disabled="!isRightPhone || conputeTime>0" class="get_verification "
                      :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">
                {{conputeTime>0 ? `倒计时${conputeTime}s`: "获取验证码"}}
              </button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code"
                     name="code" v-validate="{required: true,regex: /\d{6}$/}">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowSms }" v-else>
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="name"
                       name="name" v-validate="{required: true}">
                <span style="color: red;" >{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="ShowPwd? 'text': 'password'" maxlength="8" placeholder="密码" v-model="pwd"
                       name="pwd" v-validate="{required: true}">
                <span style="color: red;" >{{ errors.first('pwd') }}</span>
                <div class="switch_button " :class="ShowPwd? 'on': 'off'" @click="ShowPwd=!ShowPwd">
                  <div class="switch_circle" :class="{right: ShowPwd}"></div>
                  <span class="switch_text">{{ShowPwd? 'abc': '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"
                       name="captcha" v-validate="{required: true,regex: /^.{4}$/}">
                <span style="color: red;" >{{ errors.first('captcha') }}</span>
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="Updata">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button >
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {securitycode, passlogin, phonelogin} from "../../api/index"
  import { USE_DATA } from '../../store/mutation-types'
    export default {
      data () {
        return {
          isShowSms: true,
          phone: '', //手机
          code: '', //一次性短信验证码

          name:'', //用户名
          pwd: '', //密码
          captcha: '',//验证码,
          conputeTime: 0,//倒计时剩余时间
          ShowPwd: false,//是否显示密码
        }
      },
      computed: {
        //正则判断手机号
        isRightPhone (){
          const req = /^1\d{10}$/
          return /^1\d{10}$/.test(this.phone)
        },

      },
      methods: {
        //点击发送请求
        async sendCode() {
          this.conputeTime = 30
          this.timer = setInterval(() => {
            this.conputeTime--
            console.log(this.conputeTime)
          }, 1000)

          // 发送短信验证码 http://localhost:5000/sendcode?phone=13716962779
          const data = {phone:this.phone}
          let iscode = await securitycode(data)
          if(iscode.code===0){
           alert("发送成功")
          }else if (iscode.code!=0){
            alert("短信发送失败")
            this.conputeTime=0
          }
        },
        Updata() {//刷新验证码
          //一旦给img指定新的src属性浏览器会自动重新请求,并从新显示
          this.$refs.captcha.src = 'http://localhost:5000/captcha?tiam='+ Date.now()
        },
        async login () {
        // 前台表单验证+登陆
        //   phone: '', //手机
        //     code: '', //一次性短信验证码
        //     name:'', //用户名
        //     pwd: '', //密码
        //     captcha: '',//验证码,
          const  {phone, code, name, pwd, captcha, isShowSms, isRightPhone} =this
          if(isShowSms){//手机登陆
            const arr = ['phone', 'code']
            // 进行整体表单验证
            const success =await this.$validator.validateAll(arr)
            if(success){
              console.log('进行登录',success)
            }else{
              return console.log('信息错误')
            }

            const phonedata = {phone, code}
            const response =await phonelogin(phonedata)
            if(response.code!=0){
              return alert(response.msg)
            }else{
              alert("登陆成功")
              this.conputeTime=0 //跳转页面前清除定时器
              //保存用户信息
              const user = response.data
              this.$store.commit(USE_DATA,user)//保存用户信息
              this.$router.replace('/search')
            }
          }else{//密码登陆
            const arr = ['name', 'pwd', 'captcha']
            const success =await this.$validator.validateAll(arr)
            if(success){
              console.log('进行登录',success)
            }else{
             return console.log(success.msg)
            }
            // if(!name){
            //   return alert('必须输入用户名')
            // }else if(!/^[\w_-]{4,16}$/.test(pwd)){
            //   return alert('密码4至16')
            // }
            // else if(!/^.{4}$/.test(captcha)){ //验证码4位数字
            //   this.$refs.captcha.src = 'http://localhost:5000/captcha?tiam='+ Date.now()
            //   this.captcha = ''
            //   return alert('验证码错误2')
            // }
            //用户名登陆请求
            const data = {name, pwd, captcha}
            const response =await passlogin(data)
            if(response.code!=0){
              alert(response.msg)
            }else{
              alert("登陆成功")
              this.conputeTime=0 //跳转页面前清除定时器
              //保存用户信息
              const user = response.data
              console.log(user)
              //保存用户信息
              this.$store.commit(USE_DATA,user)//模块化后查找vuex中所有的mutation调用
              this.$router.replace('/search')
            }

          }
          //前面通过了验证  发送请求登陆

        },
      },
      watch:{
        //删除定时器
        conputeTime(value){
          if(value === 0){
            clearInterval(this.timer)
          }
        }
      },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"  //用到的混合
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color: black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
