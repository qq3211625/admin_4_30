//间接更新状态数据的方法对象

//ajax方法
import {reqAddress, reqCategory, reqshops, reqUser, deleteUser} from '../api/index';

//mutation方法名
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, USE_DATA} from './mutation-types'

export default {
// //  获取地址的异步action
//
//   async getAddress({commit,state}) {
//   //1执行异步请求
//     const latitude = state.latitude;
//     const longitude = state.longitude;
//     const result = await reqAddress(latitude, longitude)
//   //2根据结果,提交mutation
//     if(result.code===0){
//       const address = result.data
//       commit(RECEIVE_ADDRESS, address)
//     }
//   },
//
// //  获取食品分类列表
//   async getshops({commit}) {
//     //1执行异步请求
//     const result = await reqCategory()
//     //2根据结果,提交mutation
//     if(result.code===0){
//       const  shops= result.data
//       commit(RECEIVE_CATEGORYS, shops)
//     }
//   },
//
//
// //  根据经纬度获取商铺列表
//   async getCategorys({commit,state}) {
//     //1执行异步请求
//     const latitude = state.latitude;
//     const longitude = state.longitude;
//     const result = await reqshops({latitude, longitude})
//     //2根据结果,提交mutation
//     if(result.code===0){
//       const categorys = result.data
//       commit(RECEIVE_SHOPS, categorys)
//     }
//   },

// // 根据会话获取用户信息
//   async getUser({commit}){
//     const result = await reqUser()
//     if(result.code===0){
//       const user = result.data
//       commit(USE_DATA, user)
//     }
//   },
// //后台删除的session用户id  前台也清除用户信息
//   async deleUser({commit}){
//     const result = await deleteUser()
//     if(result.code===0){
//       const user = {}
//       commit(USE_DATA, user)
//     }
//   }
}

