// 外卖首页模块

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
 } from '../mutation-types'
import {reqAddress, reqCategory, reqshops} from "../../api";

const state = {
  latitude: 40.10038,
  longitude: 116.36867,
  address: {}, //当前地址对象
  categorys: [], //商品分类数组
  shops: [],//商家数组
}

const mutations = {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  // 更新获取分类列表
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  // 更新获取商家
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
}

const actions = {
//  获取地址的异步action

  async getAddress({commit,state}) {
    //1执行异步请求
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await reqAddress(latitude, longitude);
    // console.log(result,latitude,longitude);
    //2根据结果,提交mutation
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

//  获取食品分类列表
  async getshops({commit}) {
    //1执行异步请求
    const result = await reqCategory()
    //2根据结果,提交mutation
    if(result.code===0){
      const  shops= result.data
      commit(RECEIVE_CATEGORYS, shops)
    }
  },


//  根据经纬度获取商铺列表
  async getCategorys({commit,state}) {
    //1执行异步请求
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await reqshops({latitude, longitude})
    //2根据结果,提交mutation
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_SHOPS, categorys)
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
