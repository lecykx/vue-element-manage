import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let Base64 = require('js-base64').Base64

const fetch = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 6000
});

function make_base_auth(user, password) {
    var tok = user + ':' + password
    var hash = Base64.encode(tok)
    return "Basic " + hash
}

fetch.interceptors.request.use(config => {

    if (store.getters.token) {
        config.headers.Authorization = `Bearer ${getToken()}`
    } else {
        config.headers.Authorization = make_base_auth('park_temp', 'park_temp')
    }

    return config

}, error => {
    Promise.reject(error)
});

fetch.interceptors.response.use(
    response => response,
    error => {
        let message = error.message
        if (error.response && error.response.data && error.response.data.error_description) {
            message = error.response.data.error_description
        }
        Message({
            message: message,
            type: 'error',
            duration: 5000
        });
        return Promise.reject(error)
    }
)

export default fetch
