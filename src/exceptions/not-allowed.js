import { Exception } from '../base';

class NotAllowedException extends Exception {
    
    status = 405;
    
    constructor(message = 'Method not allowed') {
        super(message);
    }
    
}

// Defined on Exception to prevent circular dependency
Object.defineProperty(Exception, 'NotAllowed', {
    value: NotAllowedException,
    writable: false,
    enumerable: false,
    configurable: false
});

export default NotAllowedException;