import { Exception } from '../base';

class RequestException extends Exception {
    
    constructor(message = 'HTTP request failed') {
        super(message);
    }
    
}

Exception.register('Request', RequestException);

export default RequestException;