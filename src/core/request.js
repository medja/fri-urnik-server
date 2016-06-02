import { request } from 'https';
import { parse as parseUrl } from 'url';

import Exception from './exception';

class Request {
    
    constructor(userAgent) {
        this.userAgent = userAgent;
    }
    
    // Starts a new HTTP request
    fetch(url) {
        const { host, path } = parseUrl(url);
        
        const options = {
            hostname: host,
            path: path,
            method: 'GET',
            headers: {
                'user-agent': this.userAgent
            }
        };
        
        this.url = url;
        
        // Start a new request without any additional payload
        request(options, ::this.onResponse).end();
    }
    
    onResponse(res) {
        if (res.statusCode === 200) {
            // Register callbacks on success
            res.on('data', ::this.onData);
            res.on('end', ::this.onEnd);
        } else {
            // Trigger an exception if the request failed
            this.onError(new HttpException(`Cannot get ${this.url}`));
        }
    }
    
    onData(data) {}
    onError(error) {}
    onEnd() {}
    
}

class HttpException extends Exception {
    
}

export default Request;