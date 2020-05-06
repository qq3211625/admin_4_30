import Login from '../components/user/Login'
import Home from '../pages/Home/Home'
import Welcome from '../components/user/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        // 自动跳转路由
        path: '/home',
        redirect: '/welcome'
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
