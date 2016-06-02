import { Exception } from '../base';

class InternalException extends Exception {
    
    constructor(message = 'Could not process request') {
        super(message);
    }
    
}

// Defined on Exception to prevent circular dependency
Object.defineProperty(Exception, 'Internal', {
    value: InternalException,
    writable: false,
    enumerable: false,
    configurable: false
});

export default InternalException;