import html from 'htmlparser2';

import Exception from './exception';

class Parser {
    
    constructor() {
        const handlers = {
            onopentag:  this.prepare(this.onOpenTag),
            onclosetag: this.prepare(this.onCloseTag),
            ontext:     this.prepare(this.onText),
            onend:      this.prepare(this.onEnd),
            onerror:    this.prepare(this.onError)
        };
        
        const options = {
            decodeEntities: true
        };
        
        this.parser = new html.Parser(handlers, options);
    }
    
    get result() {
        return null;
    }
    
    parse(response) {
        response.onData = data => this.parser.write(data.toString());
        response.onEnd = () => this.parser.end();
        
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    
    // Wraps a method to make it reject on failure
    prepare(method) {
        return (...args) => {
            try {
                return method.apply(this, args);
            } catch (error) {
                this.onError(error);
            }
        }
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
    
    // Rejects the parser result
    onError(error) {
        // Prevent parser from resolving
        this.resolve = () => {};
        
        this.parser.end();
        
        if (error instanceof Exception) {
            this.reject(error);
        } else {
            this.reject(new Exception.Parser('Could not parse document'));
        }
    }
    
    // Resolves the parser result
    onEnd() {
        this.resolve(this.result);
    }
    
}

export default Parser;