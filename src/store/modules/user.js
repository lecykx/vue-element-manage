import { login, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import avatar from '@/assets/images/avatar.png'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo.username, userInfo.password).then(response => {
                    const data = response.data
                    setToken(response.data.access_token)
                    commit('SET_TOKEN', data.access_token)
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    const resData = response.data

                    commit('SET_ROLES', resData.roles)
                    commit('SET_NAME', resData.info.custtomerName)
                    commit('SET_CODE', resData.info.loginCode)

                    // commit('SET_AVATAR', data.avatar)
                    commit('SET_AVATAR', avatar)
                    // commit('SET_INTRODUCTION', data.introduction)
                    commit('SET_INTRODUCTION', "开发测试")

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        }
    }
}

export default user
