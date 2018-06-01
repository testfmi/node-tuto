import {IncomingHttpHeaders, IncomingMessage, ServerResponse} from "http";

var HTTP = require('http');

const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');


var server = HTTP.createServer((request: IncomingMessage, response: ServerResponse) => {



    const ff: IncomingHttpHeaders = request.headers;

    for(let gg in ff){
        console.log();
    }





    response.writeHead(200);
    response.write('coucouc');
    response.end();



});


server.listen(3000);