import { getCookie, getcookiesInServer } from '@/util'
export default function ( {route, $store, redirect, req, app} ) {

    let isClient = process.client; // 客户端渲染
    let isServer = process.server; // 服务端渲染
    var isCookie, path
    let redirectURL = '/';

    if (isClient) {
        console.log('客户端渲染')
        isCookie = getCookie('token')
        if (isCookie) {
            path = route.path;
        } else {
            path = '/login'
        }
    }

    if (isServer) {
        console.log('服务端渲染')
        let cookies = getcookiesInServer(req)
        isCookie = cookies.token ? cookies.token : null
        if (isCookie) {
            path = req.originalUrl;
        } else {
            path = '/login'
        }
    }

    if (path) {
        redirectURL = path
    }
    if (!isCookie) {
        return redirect(redirectURL);
    } 

}
