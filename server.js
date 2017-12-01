'use strict'

const http = require("http");
const url = require("url");

function start(route,handle){
    function onRequest(request, response){
        var postData = "";
        let pathname = url.parse(request.url).pathname;
        console.log("Request for %s received",pathname);

        request.setEncoding("utf8");

        request.addListener("data",function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '%s'.",postDataChunk);
        });
        request.addListener("end",function(){
            console.log("postData:",postData);
            route(handle,pathname,response,postData);
        });

       /*  response.writeHead(200, {"Content-Type": "text/plain"});
        var content = route(handle,pathname);
        response.write(content);
        response.end(); */
        //route(handle,pathname,response);
    }
    http.createServer(onRequest).listen(8888);    
    console.log("Server has started!");
}

exports.start = start;