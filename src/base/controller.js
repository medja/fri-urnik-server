import Exception from './exception';
import Model from './model';

class Controller {
    
    static routes = {};
    
    static async route(handler, req, res) {
        try {
            // Prepare a new controller instance
            const instance = new this(req, res);
            
            if (!instance[handler]) {
                throw new Exception.NotAllowed();
            }
            
            // Send a response if necessary
            instance.send(await instance[handler]())
        } catch (error) {
            // Always use a custom exception
            const exception = do {
                if (error instanceof Exception) error;
                else new Exception.Internal('Could not process request');
            }
            
            res.status(exception.status).send(this.toJSON(exception));
        }
    }
    
    static toJSON(value) {
        return JSON.stringify(value, null, 3);
    }
    
    constructor(req, res) {
        this.request = req;
        this.response = res;
        
        this.responded = false;
    }
    
    send(response = null, status = 200) {
        // A response can only be sent once
        if (this.responded) {
            return;
        }
        
        this.response.status(status);
        
        // Format the response
        if (response == null) {
            this.response.end();
        } else if (response instanceof Model) {
            this.response.send(this.toJSON(response));
        } else {
            this.response.send(response.toString());
        }
        
        this.responded = true;
    }
    
    header(name) {
        return this.request.header(name);
    }
    
    param(name, fallback = null) {
        if (name in this.request.params) {
            return this.request.params[name];
        } else {
            return fallback;
        }
    }
    
    toJSON(value) {
        return this.constructor.toJSON(value);
    }
    
}

export default Controller;