var express = require('express');
var config  = require("../config");
var restler = require("restler-bluebird");
var path = require('path');

//
var auth = function(req, res, next) {
    // session中没有用户信息, 
    if( !req.session || !req.session.user ) {
        // 没有passportCookie, 用户没有登录过, 直接跳转到登录系统
        if ( !req.cookies[config.passportCookie]) {
            var gotoURL = req.referer;  // 这样应该是没有问题的, 因为POST后面都会加redirect, 地址栏的总是可以访问的!!!!
            res.redirect(config.passportLogin + '?gotoURL=' + gotoURL);
            return;
        }
        // cookie中有passport, 但是session中没有用户信息, 则调用sso的认证接口
        else {
            restler.post(config.passportAuth, {
                passport: req.cookies[config.passportCookie]
            }).then(function(auth){
                "use strict";
                // 认证成功, 设置session中的user
                if(auth.success) {
                    res.session.user = auth.user;
                    next();
                    return;
                }
                // 单点登录auth失败    
                else {
                    res.redirect(config.passportLogin + '&gotoURL=' + (req.host + ':8081' + req.path) ); 
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
