var express = require('express');
var config  = require("../config");
var restler = require("restler-bluebird");
var path = require('path');

//
var auth = function(req, res, next) {
    // session中没有用户信息, 
    if( !req.session || !req.session.user ) {
        
        var gotoURL = req.headers['referer'];  // 这样应该是没有问题的, 因为POST后面都会加redirect, 地址栏的总是可以访问的!!!!
        
        // 没有passportCookie, 用户没有登录过, 直接跳转到登录系统
        if ( !req.cookies[config.passportCookie]) {
            res.redirect(config.passportLogin + '?gotoURL=' + gotoURL + "&from=" + process.env.DOMAIN);
            return;
        }
        // cookie中有passport, 但是session中没有用户信息, 则调用sso的认证接口
        else {
            restler.post(config.passportAuth, {
                data:{
                    passport:req.cookies[config.passportCookie]
                }
            }).then(function(auth){
                "use strict";
                // 认证成功, 设置session中的user
                if(auth.success) {
                    req.session.user = auth.user;
                    next();
                    return;
                }
                // 单点登录auth失败    
                else {
                    res.redirect(config.passportLogin + '?gotoURL=' + gotoURL + "&from=" + process.env.DOMAIN);
                }
            });
        }
    }
    // session中, 有用户的信息说明已经登录了
    else {
        next();
    }
};

module.exports = auth;
