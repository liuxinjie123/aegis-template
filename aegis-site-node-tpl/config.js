// 成员网站的setCookie URL配置
module.exports = {
    // cookie名称
    passportCookie: 'passport',
    
    // 本网站的域名    
    domain: 'www.a.com',

    // 登录跳转路径
    passportLogin: 'http://passport.yimei180.com:8089/login',
    
    // 成员网站调用passport网站的auth接口,
    passportAuth: 'http://passport.yimei180.com:8089/api/auth',

    // logout服务是需要
    passportLogout: 'http://passport.yimei180.com:8089/api/logout'
}
