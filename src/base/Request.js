import { request } from 'https';
import { parse } from 'url';

import Exception from './Exception';
import Response from './Response';

class Request {
    
    constructor(userAgent, headers = {}) {
        this.headers = {
            ...headers,
            'user-agent': userAgent
        };
    }
    
    get(url) {
        const { hostname, path } = parse(url);
        
        const options = {
            path,
            hostname,
            method: 'GET',
            headers: this.headers
        };
        
        return new Promise((...args) => {
            const handler = this.handleResponse.bind(this, ...args, url);
            
            // Initiate a request with no body
            request(options, handler).end();
        });
    }
    
    handleResponse(resolve, reject, url, res) {
        // Check if the response status is 2xx
        if (res.statusCode / 100 | 0 === 2) {
            resolve(new Response(res));
        } else {
            reject(new Exception.Request(`Could not fetch ${url}`));
        }
    }
    
}

export default Request;