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

// Define serialization method
Object.defineProperty(Exception.prototype, 'toJSON', {
    writable: true,
    enumerable: false,
    configurable: true,
    
    value: function() {
        return {
            type: this.name,
            message: this.message
        };
    }
});

// Define exception registration method to prevent circular dependencies
Object.defineProperty(Exception, 'register', {
    writable: false,
    enumerable: false,
    configurable: false,
    
    value: function (name, Type) {
        Object.defineProperty(Exception, name, {
            value: Type,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
});

export default Exception;