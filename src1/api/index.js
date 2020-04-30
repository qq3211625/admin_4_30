//定义 请求的  函数数据体
/*
包含n个接口请求函数的模块
调用ajax函数发请求
函数的返回值是promise
 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (latitude, longitude) => ajax(BASE + `/position/${latitude},${longitude}`);


//2获取食品分类列表
export const reqCategory = () => ajax(BASE + '/index_category');

// 3、根据经纬度获取商铺列表

export const reqshops = ({latitude, longitude}) => ajax(BASE + '/shops', {latitude, longitude});
                        // var {latitude, longitude} = {latitude:1,  longitude:2}
                        // var obj={latitude1:1,  longitude:2}

// 发送短信验证码 http://localhost:5000/sendcode?phone=13716962779
export const securitycode  = ({phone:phone}) => ajax(BASE + '/sendcode', {phone:phone});

//手机号验证码登陆  请求URL：http://localhost:5000/login_sms
export const phonelogin = ({phone, code}) => ajax(BASE + '/login_sms', {phone, code}, "POST")

// ### POST 请求URL：http://localhost:5000/login_pwd
export const passlogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, "POST")

//### 根据会话获取用户信息 http://localhost:5000/userinfo

export const reqUser = () => ajax(BASE + '/userinfo');//免登陆

//登出用户,删除cookie
export const deleteUser = () => ajax(BASE + '/logout');//免登陆


//模拟接口发送请求
export const reqGoods = () => ajax( '/goods');//
export const reqRatings = () => ajax( '/ratings');//
export const reqInfo = () => ajax( '/info');//
