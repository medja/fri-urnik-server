import html from 'htmlparser2';

import Builder from './builder';
import Request from './request';
import Exception from './exception';

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
    
    // Starts an HTTP request and streams it to the parser
    parse(url) {
        this.builder = new Builder();
        
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
        if (name === 'h2') {
            this.builder.startTitle();
        }
        
        if (name === 'td') {
            this.builder.startAllocation(attributes);
            return;
        }
        
        if (!this.builder.hasAllocation()) {
            return;
        }
        
        if (name === 'span') {
            this.builder.startDescription();
            return;
        }
        
        if (attributes['class'] === 'group') {
            this.builder.addGroup(attributes);
            return;
        }
        
        if (name === 'a') {
            this.builder.startMeta(attributes);
            return;
        }
    }
    
    // Handles partial text nodes
    onText(text) {
        this.builder.setValue(text);
    }
    
    // Handles closing tags
    onCloseTag(name) {
        if (name === 'tr') {
            this.builder.endHour();
        } else if (name === 'td') {
            this.builder.endAllocation();
        }
        
        if (name !== 'br') {
            this.builder.endMeta();
        }
    }
    
    // Handles all request and parser errors
    onError(error) {
        this.parser.end();
        
        // Subsitute the error if it's not a ScheduleException
        if (error instanceof Exception) {
            this.reject(error);
        } else {
            this.reject(new Exception('Cannot parse schedule'));
        }
    }
    
    // Resolves the request once the parser has finished
    onEnd() {
        this.resolve(this.builder.result());
    }
    
}

export default Parser;