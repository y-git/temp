/**
 * 作者：YYC
 * 日期：2013-12-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe('测试服务器端socket.io', function () {
    it("连接到服务器后，收到信息", function (done) {
        var io = require('socket.io-client');

        var socket = io.connect("http://localhost:8001");

        socket.on('connect', function () {
            socket.on('message', function (mes) {
                expect(mes).toEqual("connected!");
                socket.disconnect();    //终止连接

                done();
            });
        });
    });
});