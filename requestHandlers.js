'use strict'

const querystring = require("querystring");
const exec = require("child_process").exec;

function sleep(milliSecond){
    let startTime = new Date().getTime();
    while(new Date().getTime() < startTime + milliSecond);
}

function start(response,postData){
    console.log("Request handler 'start' was called.");
    //sleep(10000);
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

    /* exec("dir *.*",{timeout:10000, maxBuffer:20000*1024},function(error,stdout,stderr){
        let content = "empty";
        response.writeHead(200, {"Content-Type":"text/plain;"});
        if(stdout !== ""){
            content = stdout;
        }
        else if(error !== ""){
            content = error.message;
        }
        else{
            content = "Can't use childprocess";
            console.log("stderr:",stderr);
        }
        response.write(content);
        response.end();
    }); */
    //return "Hello Start";
}

function upload(response,postData){
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("Hello Upload");
    response.write("You've sent:"+querystring.parse(postData).text);
    //response.write("You've sent:"+postData);
    response.end();
}

exports.start = start;
exports.upload = upload;