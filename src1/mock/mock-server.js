// 使用mockjs来mock数据接口

import Mock from 'mockjs'
import data from './data.json'  //data 是js对象(内部已经解析了json)

//产生mock接口        返回的数据
Mock.mock('/goods', {code: 0, data: data.goods}) //发请求要跟这个路径一样
Mock.mock('/ratings',  {code: 0, data: data.ratings}) //发请求要跟这个路径一样
Mock.mock('/info', {code: 0, data: data.info} ) //发请求要跟这个路径一样

//后面发对上面3个路径的ajax 请求就可以拦截并返回随机生成的json 数据
