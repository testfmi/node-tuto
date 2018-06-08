"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP = require('http');
const URL = require('url');
// const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
var server = HTTP.createServer((request, response) => {
    const incomingHttpHeaders = request.headers;
    for (let key in incomingHttpHeaders) {
        console.log(`${key}: ${incomingHttpHeaders[key]}`);
    }
    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers['user-agent'];
    let res = {};
    res['request'] = {
        headers: request.headers,
        httpVersion: request.httpVersion,
        method: request.method,
        trailers: request.trailers,
        statusCode: request.statusCode,
        statusMessage: request.statusMessage,
        url: request.url,
    };
    res['parsed url'] = URL.parse(request.url);
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('toto', 'totobar');
    response.writeHead(200, 'tout est ok !');
    // response.write(JSON.stringify(request.headers));
    response.write(JSON.stringify(res));
    response.end();
});
server.listen(3000);
//# sourceMappingURL=app.js.map