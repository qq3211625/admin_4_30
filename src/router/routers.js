import Login from '../components/user/Login'
import Test from '../components/user/Test'
import Home from '../pages/Home/Home'
import Welcome from '../components/user/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cate from '../components/goods/Cate'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        // 自动跳转路由
        path: '/home',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/categories',
        component: Cate
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
