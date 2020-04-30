import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Ratings from '../pages/Shop/Ratings/Ratings'
import Info from '../pages/Shop/Info/Info'

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isoff: true,
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isoff: true,
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isoff: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isoff: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/Shop',
    component: Shop,
    children: [
      {
        path: '/Shop/goods',
        component: Goods
      },{
        path: '/Shop/ratings',
        component: Ratings
      },{
        path: '/Shop/info',
        component: Info
      },
      {
        //自动跳转路由
        path:'/Shop',
        redirect: '/Shop/goods'
      }
    ]
  },
  {
    //自动跳转路由
    path:'/',
    redirect: '/msite'
  }
]
