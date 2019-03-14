import axios from '~/plugins/http'
import { getUrl } from './path'


const login = {
    userLogin(params){
        console.log(params)
        return axios({
            method:'GET',
            url: getUrl('/uc/login'),
            headers:{
                "Authorization": params,
                "x-ajax": true
            }
        })
    },
    userLogout () {
        return axios({
            methods: 'GET',
            url: getUrl('/uc/logout')
        })
    },
    getUserInfo  () {
        return axios ({
            method: 'GET',
            url: getUrl(`/uc/currentuser`),
        })
    },
}
export default login