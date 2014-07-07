/**
 * 作者：YYC
 * 日期：2013-12-16
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
define(function (require, exports, module) {
    var test = require("./test2");

    exports.init = function () {
        console.log("main");
        test.show();
    }
})