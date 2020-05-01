import Login from '../components/Login'
import Home from '../components/Home'
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/',
    redirect: '/Login'
  }
]
