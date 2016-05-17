// 成员网站的setCookie URL配置

var mydomain;  
if( process.env.DOMAIN == 'a') {
  mydomain = 'www.a.com';
}
else if( process.env.DOMAIN == 'b') {
    mydomain = 'www.b.com';
} 
else {
    mydomain = 'www.a.com';
    process.env.DOMAIN='a';
    //console.error("必须设置DOMAIN!!!, example: DOMAIN=a; node app.js");
    //process.exit(-1);
}

//
module.exports = {
    // cookie名称
    passportCookie: 'passport',
    
    // 本网站的域名    
    domain: mydomain,

    // 登录跳转路径
    passportRegister: 'http://passport.yimei180.com:3000/register',

    // 登录跳转路径
    passportLogin: 'http://passport.yimei180.com:3000/login',
    
    // 成员网站调用passport网站的auth接口,
    passportAuth: 'http://passport.yimei180.com:3000/api/auth',

    // logout服务是需要
    passportLogout: 'http://passport.yimei180.com:3000/api/logout'
}
