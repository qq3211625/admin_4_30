/*
包含n个接口请求函数的模块
函数的返回值是promise
 */
import ajax from './ajax'
const BASE = 'http://127.0.0.1:8888/api/private/v1'

export default {
  // 请求登录
  passlogin: ({username, password}) => ajax(BASE + '/login', {username, password}, 'POST'),
  // 左侧分类列表
  getMenu: () => ajax(BASE + '/menus'),
  //  请求用户列表数据
  getUserList: ({pagenum, pagesize, query}) => ajax(BASE + '/users', {pagenum, pagesize, query}),
  //  修改 switch 用户状态
  userSwitch: ({id, state}) => ajax(BASE + `/users/${id}/state/${state}`, {}, 'PUT'),
  // 添加用户数据
  addUsers: ({Email, username, password}) => ajax(BASE + '/users', {Email, username, password}, 'POST'),
  // 删除用户数据
  delete: ({id}) => { return ajax(BASE + `/users/${id}`, {}, 'DELETE') }
  // --------------
  // 上面都是简写形式 ruq: () => { return ajax() }
}
