import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Users from '@/components/Users'
import Departments from '@/components/Departments'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/main',
      name: '主页',
      component: Main,
      children: [
        { path: 'users', name: '用户管理', component: Users },
        { path: 'departments', name: '部门管理', component: Departments }
      ]
    }
  ]
})
