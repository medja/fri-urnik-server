import { Exception } from '../base';

class NotAllowedException extends Exception {
    
    status = 405;
    
    constructor(message = 'Method not allowed') {
        super(message);
    }
    
}

Exception.register('NotAllowed', NotAllowedException);

export default NotAllowedException;