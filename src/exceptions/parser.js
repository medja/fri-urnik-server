import { Exception } from '../base';

class ParserException extends Exception {
    
    constructor(message = 'HTTP request failed') {
        super(message);
    }
    
}

Exception.register('Parser', ParserException);

export default ParserException;