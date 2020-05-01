// 定义 请求的  函数数据体
/*
包含n个接口请求函数的模块
调用ajax函数发请求
函数的返回值是promise
 */
import ajax from './ajax'
const BASE = 'http://127.0.0.1:8888/api/private/v1'
// 请求登录
export const passlogin = ({username, password}) => ajax(BASE + '/login', {username, password}, 'POST')
// 获取食品分类列表
// export const reqCategory = () => ajax(BASE + '/index_category')
// const BASE = '/api'
// 根据经纬度获取位置详情
// export const reqAddress = (latitude, longitude) => ajax(BASE + `/position/${latitude},${longitude}`)
// 发送短信验证码 http://localhost:5000/sendcode?phone=13716962779
// export const securitycode = ({phone: phone}) => ajax(BASE + '/sendcode', {phone:phone})
// ### POST 请求URL：http://localhost:5000/login_pwd
