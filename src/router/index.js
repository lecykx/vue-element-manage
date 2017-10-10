import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'

// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading
const _import = require('./_import_' + process.env.NODE_ENV)
const Err404 = _import('error/404')
const Err401 = _import('error/401')
const Login = _import('login/index')
const AuthRedirect = _import('login/authredirect')
const RoleManage = _import('admin/roleManage')

Vue.use(Router)

export const constantRouterMap = [

  { path: '/', component: Layout, redirect: '/admin/roleManage', name: '首页', hidden: true },
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: AuthRedirect, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  { path: '/401', component: Err401, hidden: true }

]

export const asyncRouterMap = [
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    name: 'profile',
    meta: { role: ['SUPER_ADMIN'] },
    noDropdown: true,
    children: []
  },
  {
    path: '/admin',
    component: Layout,
    redirect: 'noredirect',
    name: '管理员管理',
    icon: 'guanliyuanguanli',
    meta: { role: ['SUPER_ADMIN'] },
    children: [
      { path: 'roleManage', component: RoleManage, name: '角色管理', meta: { role: ['SUPER_ADMIN'] } }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
