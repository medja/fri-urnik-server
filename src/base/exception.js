function Exception(message) {
    // Initialize the error
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    
    // Define the error name and message
    Object.defineProperties(this, {
        'name': {
            value: this.constructor.name,
            enumerable: true,
            configurable: false,
            writable: false
        },
        'message': {
            value: message,
            enumerable: true,
            configurable: false,
            writable: false
        }
    });
}

// Manually extend the native Error any problems with Babel
Exception.prototype = Object.create(Error);
Exception.prototype.constructor = Exception;

// Define a default status code
Object.defineProperty(Exception.prototype, 'status', {
    value: 500,
    writable: true,
    enumerable: true,
    configurable: true
});

export default Exception;