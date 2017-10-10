import fetch from '@/utils/fetch';

export function getUserRole(loginId) {

    return fetch({
        url: 'park-user-service/v1/role/findByLoginId/' + loginId,
        method: 'get'
    },
    {
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });

}

export function updateLoginRole(datas) {

    return fetch({
        url: 'park-user-service/v1/role/updateLoginRole',
        method: 'PUT',
        data: datas
    },
    {
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });

}

export function selectByFilter(datas) {

    return fetch({
        url: 'park-user-service/v1/role/selectByFilter',
        method: 'POST',
        data: datas
    },
    {
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });

}

export function insertRole(FormData) {

    return fetch({
        url: 'park-user-service/v1/role/insertRole',
        method: 'post',
        data: FormData
    },
    {
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
}

export function updateRole(FormData) {

    return fetch({
        url: 'park-user-service/v1/role/updateRole',
        method: 'PUT',
        data: FormData
    },
    {
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    });
}