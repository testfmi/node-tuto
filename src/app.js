"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const HTTP = require('http');
// const URL = require('url');
const testURL = url_1.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
const server = HTTP.createServer((request, response) => {
    const coto = new Coto(request, response);
    coto.get('/', () => {
        const incomingHttpHeaders = request.headers;
        for (const key in incomingHttpHeaders) {
            console.log(`${key}: ${incomingHttpHeaders[key]}`);
        }
        const { method, url } = request;
        const { headers } = request;
        const userAgent = headers['user-agent'];
        const res = {};
        res['request'] = {
            headers: request.headers,
            httpVersion: request.httpVersion,
            method: request.method,
            trailers: request.trailers,
            statusCode: request.statusCode,
            statusMessage: request.statusMessage,
            url: request.url,
        };
        res['parsed url'] = url_1.parse(request.url);
        // res['parsed testURL'] = urlParse(testURL);
        // response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('toto', 'totobar');
        response.writeHead(200, 'tout est ok !');
        // response.write(JSON.stringify(request.headers));
        response.write(JSON.stringify(res));
        response.end();
    });
    coto.get('/info', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        res.writeHead(200);
        res.write('<h1>Info yeah</h1>');
        res.end();
    });
});
server.listen(3000);
class Coto {
    constructor(request, response) {
        if (request == null) {
            throw Error('erreur');
        }
        this.request = request;
        this.response = response;
    }
    method(verb, pathname, f) {
        const { method } = this.request;
        const urlWithStringQuery = url_1.parse(this.request.url);
        if (method === verb && urlWithStringQuery.pathname === pathname) {
            f(this.request, this.response);
        }
    }
    get(pathname, f) {
        this.method('GET', pathname, f);
    }
}
//# sourceMappingURL=app.js.map