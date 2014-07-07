var io, http, server;

io = require('socket.io').listen(8001); //监听本地8001端口

//http = require('http');
//server = http.Server();   这个不能获得已创建的服务器！

//io.listen(server).on('connection', function (socket) {
//    socket.send("connected!");
//});

io.on('connection', function (socket) {      //注意！不是io.sockets.listen！
    socket.send("connected!");
});