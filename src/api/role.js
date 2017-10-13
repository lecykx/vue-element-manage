import fetch from '@/utils/fetch';

export function getUserRole(loginId) {

    return fetch({
        url: 'park-user-service/v1/role/findByLoginId/' + loginId,
        method: 'GET'
    })

}

export function updateLoginRole(datas) {

    return fetch({
        url: 'park-user-service/v1/role/updateLoginRole',
        method: 'PUT',
        data: datas
    })

}

export function selectByFilter(datas) {

    return fetch({
        url: 'park-user-service/v1/role/selectByFilter',
        method: 'POST',
        data: datas
    })

}

export function insertRole(FormData) {

    return fetch({
        url: 'park-user-service/v1/role/insertRole',
        method: 'POST',
        data: FormData
    })
}

export function updateRole(FormData) {

    return fetch({
        url: 'park-user-service/v1/role/updateRole',
        method: 'PUT',
        data: FormData
    })
}