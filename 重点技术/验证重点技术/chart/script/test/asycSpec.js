var request = require('request');

describe('asyc tests', function(){
    it("should respond with kunkun", function(done) {
        request("http://localhost:8010", function(error, response, body){
                      expect(response.statusCode).toEqual(200);
            expect(response.headers["content-type"]).toEqual("text/html");
            expect(body).toEqual("testBodyaaa");
            done();
        });
    });
});

//            var http = require('http');
//
//
//describe('asyc tests', function(){
//    it("should respond with kunkun", function(done) {
//        var options = {
//            hostname: 'http://localhost',
//            port: 8010,
////    path: '/upload',
//            method: 'get'
//        };
//
//        var req = http.request(options, function(res) {
////    console.log('STATUS: ' + res.statusCode);
////    console.log('HEADERS: ' + JSON.stringify(res.headers));
////    res.setEncoding('utf8');
//            res.on('data', function (chunk) {
//               expect(chunk).toEqual("testBoy");
//                done();
//            });
//        });
//        req.end();
//
//    });
//});