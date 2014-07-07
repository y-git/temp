/**
 * 作者：YYC
 * 日期：2013-12-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.write("testBodyaaa");
    res.end();
})

server.listen(8010, function () {
    console.log('Listening at: http://localhost:8010');
});