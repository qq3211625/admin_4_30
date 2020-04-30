// 点击商家就是某个商家模块

import {RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS} from "../mutation-types";

const state = {
  //商家数据
  goods:[],    //商品分类列表
  ratings:[],  //商家评价列表
  info:{},     //商家信息
  cartFoods: [] //购物车数组
}

const mutations = {
  [RECEIVE_GOODS] (state,goods) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state,ratings) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state,info) {
    state.info = info
  }
}

const actions = {

}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
