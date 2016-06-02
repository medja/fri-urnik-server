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
            
            const result = await instance[handler]();
            
            // Send a response if necessary
            if (!instance.responded) {
                if (result == null) {
                    res.end();
                } else if (result instanceof Model) {
                    res.send(model.toJSON());
                } else {
                    res.send(result.toString());
                }
            }
        } catch (error) {
            // Always use a custom exception
            const exception = do {
                if (error instanceof Exception) error;
                else new Exception.Internal('Could not process request');
            }
            
            res.status(exception.status).send(exception.toJSON());
        }
    }
    
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }
    
}

export default Controller;