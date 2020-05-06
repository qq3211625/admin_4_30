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
  delete: ({id}) => ajax(BASE + `/users/${id}`, {}, 'DELETE'),
  // 获取权限列表数据
  getRights: () => ajax(BASE + '/rights/list'),
  // 获取权限列表数据(树状图)
  getRightsT: () => ajax(BASE + '/rights/tree'),
  // 获取角色数据
  getRoles: () => ajax(BASE + '/roles'),
  // 删除角色数据
  roleId: ({roleId, rightId}) => ajax(BASE + `/roles/${roleId}/rights/${rightId}`, {}, 'DELETE'),
  // 角色授权
  changeRoles: (roleId, {rids}) => ajax(BASE + `/roles/${roleId}/rights`, {rids}, 'POST'),
  // 获取角色列表
  getRolesList: () => ajax(BASE + '/roles'),
  // 分配角用户色
  allotRole: ({id, rid}) => ajax(BASE + `/users/${id}/role`, {rid}, 'PUT')
// --------------
  // 上面都是简写形式 ruq: () => { return ajax() }
}
