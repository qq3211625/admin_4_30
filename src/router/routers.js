import Login from '../components/Login'
import Home from '../pages/Home/Home'
import Welcome from '../components/Welcome'
import Users from '../components/Users'

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
