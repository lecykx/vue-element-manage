import { asyncRouterMap, constantRouterMap } from '@/router'
import { deepClone } from '@/utils'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 *
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        // 路由元素包含meta和route
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        // 如果路由未设置 meta或route就说明此路由对权限不敏感，可开放给所有用户
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 *
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {

    state: {
        routers: constantRouterMap,
        addRouters: []
    },

    mutations: {

        SET_ROUTERS: (state, routers) => {
            state.addRouters = deepClone(routers)
            state.routers = deepClone(constantRouterMap.concat(routers))
        }
    },

    actions: {

        // 路由的设置
        // 如果角色中有admin则返回admin的权限
        // 如果角色中没有admin则返回
        // data 是 用户的角色对象
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters

                if (roles.indexOf('SUPER_ADMIN') >= 0) {
                    // 给予管理员角色
                    accessedRouters = asyncRouterMap
                } else {
                    // 获取符合用户权限的路由。
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
