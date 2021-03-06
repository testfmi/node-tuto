import {IncomingMessage, ServerResponse} from "http";
import { parse as urlParse, UrlWithStringQuery } from 'url';

enum HTTP_VERB {
    GET = 'GET',
    POST = 'POST',
}

export class Coto {

    private request: IncomingMessage;
    private response: ServerResponse;
    private hasAnswered = false;

    constructor(request: IncomingMessage, response: ServerResponse) {
        if (request == null) { throw Error('erreur'); }
        this.request = request;
        this.response = response;
    }

    private performResponse = (f: (request: IncomingMessage, response: ServerResponse) => void) => {

        console.log('Coto request.url:', this.request.url);

        if(!this.hasAnswered) {
            this.hasAnswered = true;
            f(this.request, this.response);
        }
    }

    private httpMethod = (verb: HTTP_VERB) =>
         (pathname: string, f: (request: IncomingMessage, response: ServerResponse) => void) => {
            const {method} = this.request;
            const urlWithStringQuery: UrlWithStringQuery = urlParse(this.request.url);

            if (method === HTTP_VERB[verb] && urlWithStringQuery.pathname === pathname) {
                this.performResponse(f);
            }
        };

    public get = this.httpMethod(HTTP_VERB.GET);
    public post = this.httpMethod(HTTP_VERB.POST);

    // this should be placed after all others http methods
    public else = this.performResponse;
}

