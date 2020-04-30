//使用表单验证插件
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

// 3). 提示信息本地化
import zh_CN from 'vee-validate/dist/locale/zh_CN'
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '验证码'

  }
})
