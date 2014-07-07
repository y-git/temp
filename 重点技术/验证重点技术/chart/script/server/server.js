/**
 * 作者：YYC
 * 日期：2013-12-16
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
function start() {
//    var fs = require('fs'),
    var http = require('http'),
        socketio = require('socket.io');

    var server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-type': 'text/html'});
//        res.end(fs.readFileSync(__dirname + '/index.html'));
        res.end();
    }).listen(8080, function () {
            console.log('Listening at: http://localhost:8080');
        });

    socketio.listen(server).on('connection', function (socket) {
        socket.on('message', function (msg) {
            console.log('Message Received: ', msg);
            socket.broadcast.emit('message', msg); //广播
        });
    });
}

exports.start = start;
