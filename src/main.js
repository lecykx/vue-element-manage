// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import ErrLog from '@/store/errLog'
import IconSvg from '@/components/icon-svg'
import Footer from '@/components/footer'
import { getToken } from '@/utils/auth'

Vue.component('icon-svg', IconSvg)
Vue.component('page-footer', Footer)
Vue.use(ElementUI)

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('SUPER_ADMIN') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect', '/401', '/404']

router.beforeEach((to, from, next) => {

  NProgress.start()

  if (getToken()) {

    if (to.path === '/login') {
      next({ path: '/' })
    } else {

      if (store.getters.roles.length === 0) {

        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles

          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to })
          })
        })
      } else {

        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()
        } else {
          next({ path: '/401', query: { noGoBack: true } })
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

Vue.config.productionTip = false

router.afterEach(() => {
  NProgress.done()
})

if (process.env === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    ErrLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
