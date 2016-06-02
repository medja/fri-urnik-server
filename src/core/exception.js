function Exception(message) {
    // Initialize the error
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    
    // Define the Error name and message

    Object.defineProperty(this, 'name', {
        value: this.constructor.name,
        enumerable: false,
        configurable: false,
        writable: false
    });
    
    Object.defineProperty(this, 'message', {
        value: message,
        enumerable: false,
        configurable: false,
        writable: false
    });
}

// Extending is done manually as Babel has a problem with extending Error
Exception.prototype = Object.create(Error);
Exception.prototype.constructor = Exception;

// Define a default status code
Object.defineProperty(Exception.prototype, 'status', {
    get: () => 500,
    enumerable: true,
    configurable: true
});

export default Exception;