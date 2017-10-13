import fetch from '@/utils/fetch'

let qs = require('qs')

export function login(username, password) {

    const data = {
        username,
        password,
        grant_type: 'password',
        scope: 'park_app'
    }

    return fetch({
        url: 'park-auth-service/auth/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    })
}

export function getUserInfo() {
    return fetch({
        url: 'park-auth-service/auth/user',
        method: 'GET'
    })
}





