import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { parse as urlParse } from 'url';
import {Coto} from "./coto";
const HTTP = require('http');
// const URL = require('url');


const testURL = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';


const server = HTTP.createServer((request: IncomingMessage, response: ServerResponse) => {

    const coto: Coto = new Coto(request, response);

    coto.get('/', () => {

        const incomingHttpHeaders: IncomingHttpHeaders = request.headers;

        for (const key in incomingHttpHeaders) {
            console.log(`${key}: ${incomingHttpHeaders[key]}`);
        }

        const {method, url} = request;
        const {headers} = request;
        const userAgent = headers['user-agent'];

        const res: any = {};

        res['request'] = {
            headers: request.headers,
            httpVersion: request.httpVersion,
            method: request.method,
            trailers: request.trailers,
            statusCode: request.statusCode,
            statusMessage: request.statusMessage,
            url: request.url,
        };


        res['parsed url'] = urlParse(request.url);
        res['parsed testURL'] = urlParse(testURL);

        // response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('toto', 'totobar');
        response.writeHead(200, 'tout est ok !');

        // response.write(JSON.stringify(request.headers));
        response.write(JSON.stringify(res));
        response.end();

    });

    coto.get('/info', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        res.writeHead(200);
        res.write('<h1>Info yeah</h1>');
        res.end();
    });

    coto.post('/', (req: IncomingMessage, res: ServerResponse) => {
        // find POST body data
        const buffers: Buffer[] = [];
        req.on('data', (chunk: Buffer) => {
            buffers.push(chunk);
        }).on('end', () => {
            const body = Buffer.concat(buffers).toString();

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(200);

            response.write(JSON.stringify(body));
            response.end();
        });
    });

    coto.else((req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write('<h1>404 not found</h1><h2>(else)</h2>');
        res.end();
    });

});

server.listen(3000);

