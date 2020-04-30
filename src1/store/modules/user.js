// 用户模块

import {USE_DATA} from "../mutation-types";
import {deleteUser, reqUser} from "../../api";

const state = {
  user: {}, //用户数据
}

const mutations = {
  [USE_DATA] (state,user) {
    state.user = user
  },
}

const actions = {
// 根据会话获取用户信息
  async getUser({commit}){
    const result = await reqUser()
    if(result.code===0){
      const user = result.data
      commit(USE_DATA, user)
    }
  },
//后台删除的session用户id  前台也清除用户信息
  async deleUser({commit}){
    const result = await deleteUser()
    if(result.code===0){
      const user = {}
      commit(USE_DATA, user)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
