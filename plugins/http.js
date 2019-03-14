
import axios from 'axios'
// import store from './store'
import {getCookie, removeCookie} from '@/util'

// console.log(process, 'klklklklklklklklklklklk')
// if (process.env.NODE_ENV === 'production') {
//     console.log('progress is sever')
//     axios.defaults.baseURL = 'http://192.168.0.150:8090/api'
// }

// 此处为axios配置请求头，
axios.interceptors.request.use(
    config => {
        // 此处做请求拦截，如果有需要
        console.log(config, 'config')
        if (!(config.url.includes('login'))) {
            config.headers = {
                'request-token': JSON.parse(getCookie('token')),
                "x-ajax": true,
                "content-type":'application/json',
            }
        }
        return config
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)
//响应拦截器即异常处理
axios.interceptors.response.use(
    response => {
        if ((response.status === 200 && response.request.status === 200) || (response.status === 201 && response.request.status === 201)) {//成功判断
              // console.log(response, 'opoppopopopop')
            // if (response.data) {                                                                                                                                                                                                                                                                                                                                                                                                                         
                return response.data
        }
        return response
    },
    error => {//失败判断
        if (error.response) {
            switch (error.response.status){
                case 401:
                    if (!error.response.config.url.includes('login')) {
                        // store.dispatch('clearToken').then(() => location.reload())
                        removeCookie('token')
                        // location.reload()
                        location.href='/login'
                    }
            }
        }
        return Promise.reject(error.response.data)
    }
)


export default axios
