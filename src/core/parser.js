import html from 'htmlparser2';

import Exception from './exception';
import Request from './request';

class Parser {
    
    // Initializes a new HTML parser and HTTP request
    constructor(userAgent) {
        this.parser = new html.Parser({
            onopentag:  this.wrap(this.onOpenTag),
            onclosetag: this.wrap(this.onCloseTag),
            ontext:     this.wrap(this.onText),
            onend:      this.wrap(this.onEnd),
            onerror:    this.wrap(this.onError)
        }, {
            decodeEntities: true
        });
        
        this.request = new Request(userAgent);
        
        // Stream the HTTP response into the parser
        this.request.onData = data => this.parser.write(data.toString());
        this.request.onEnd = () => this.parser.end();
        
        // Handle HTTP request errors
        this.request.onError = this.wrap(this.onError);
    }
    
    // Parser result
    get result() {
        return null;
    }
    
    // Starts an HTTP request and streams it to the parser
    parse(url) {
        // Return a promise to allow async flow
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            
            // Start the HTTP request
            this.request.fetch(url);
        });
    }
    
    // Wraps a function to reject on failure
    wrap(func) {
        return (...args) => {
            try {
                return func.apply(this, args);
            } catch (error) {
                this.reject(error);
            }
        };
    }
    
    // Handles opening tags
    onOpenTag(name, attributes) {
        
    }
    
    // Handles partial text nodes
    onText(text) {
        
    }
    
    // Handles closing tags
    onCloseTag(name) {
        
    }
    
    // Handles all request and parser errors
    onError(error) {
        this.parser.end();
        
        if (error instanceof Exception) {
            this.reject(error);
        } else {
            this.reject(new ParseException('Cannot parse HTML'));
        }
    }
    
    // Resolves the request once the parser has finished
    onEnd() {
        this.resolve(this.result);
    }
    
}

class ParseException extends Exception {
    
}

export default Parser;