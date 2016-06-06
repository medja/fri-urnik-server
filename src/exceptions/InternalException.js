import { Exception } from '../base';

class InternalException extends Exception {
    
    constructor(message = 'Could not process request') {
        super(message);
    }
    
}

Exception.register('Internal', InternalException);

export default InternalException;