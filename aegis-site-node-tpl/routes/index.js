var express = require('express');
var router = express.Router();
var config = require("../config");
var restler = require("restler-bluebird");
var path = require('path');
var multiline = require('multiline');

//
// 首页 - 显示
// 1. 直接登录
// 2. 直接登出
// 3. 显示订单
//
router.get('/', function (req, res) {
    var str = multiline(function(){/*
        <a href="http://www.a.com:8081/login">直接登录</a> 
        <a href="http://passport.a.com">直接登出</a>
        <a href="/orders">显示订单</a>'); 
    */});
    res.send(str);
});

// 用户点击登录, 直接跳转到登录界面
router.get('/login', function (req, res) {
    "use strict";
    res.redirect(config.passportLogin);
})

//
// jsonp-ajax
// /setcookie?callback=$callbackName&passport=$passport  用于设jsonp设置passportCookie 
//
router.get('/setcookie', function (req, res) {
    
    var jsonpCallback = req.query.callback; 
    var passport = req.query.passport;
   
    // 种cookie
    res.cookie(config.passportCookie, passport, {
        domain: config.domain,
        expires: new Date(),   // todo  wangqi
    });
    
    // jsonp应答
    res.send(jsonpCallback + "({})");
});

// 用户点击登出
router.get('/logout', function (req, res) {
    
    // 清空user
    req.session.user = undef;
   
    // 清空passport cookie
    req.cookies[config.passportCookie] = undef;
    
    // 通知sso用户已经登出
    restler.post(config.passportLogout, {
        passort: req.cookies[config.passportCookie]
    }).then(function(resp){
        "use strict";
        res.redirect("/");   // 重定向到主页
    })
    return;
});


