import Cookie from "js-cookie"

//  获取token
export function getCookie (key) {
    let token = Cookie.get(key) ? Cookie.get(key) : null
    return token
}

// 存储token
export function setCoolie (key, data) {
    Cookie.set(key, JSON.stringify(data), {expires: 7})
}

// 移除token
export function removeCookie (key) {
    if (getCookie(key) !== '' || null) {
        Cookie.remove(key)
    }
    
}

//  获取服务端token
export function getcookiesInServer(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function(val) {
        let parts = val.split('=');
        service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
}