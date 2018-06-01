"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP = require('http');
const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
var server = HTTP.createServer((request, response) => {
    const ff = request.headers;
    for (let gg in ff) {
        console.log();
    }
    response.writeHead(200);
    response.write('coucouc');
    response.end();
});
server.listen(3000);
//# sourceMappingURL=app.js.map