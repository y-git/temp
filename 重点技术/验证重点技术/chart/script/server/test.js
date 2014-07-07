/**
 * 作者：YYC
 * 日期：2013-12-16
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */


function start() {
    var http = require("http");

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World");
    response.write("bbbba");
    response.end();
})
    server.listen(8808);
//    server.stop();

}

exports.start = start;



//
//var http = require("http");
//var url = require("url");
//
//function start() {
//    function onRequest(request, response) {
//        var pathname = url.parse(request.url).pathname;
//        console.log("Request for " + pathname + " received.");
//        response.writeHead(200, {"Content-Type": "text/plain"});
//        response.write("Hello World");
//        response.end();
//    }
//
//    http.createServer(onRequest).listen(8888);
//    console.log("Server has started.");
//}
//
//exports.start = start;
