var express = require('express');
var router = express.Router();
var config = require("../config");
var restler = require("restler-bluebird");
var passport = require("../middlewares/passport");
var multiline = require("multiline");

// 列出order
router.get("/", 
    
    passport,    // 先判断是否登录
   
    // 登录过就显示订单信息!!!!
    function(req, res) {
    "use strict";
    var str = multiline(function(){/*
        <!doctype html>
        <body>
            <table>
            <tr><td>订单id</td><td>描述</td></tr>
            <tr><td>订单id</td><td>描述</td></tr>
            <tr><td>订单id</td><td>描述</td></tr>
            </table>
        </body>
        <a href="/">首页</a>
        </html>
    */});
    res.send(str);
});

module.exports = router;
