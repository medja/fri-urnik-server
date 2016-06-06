class Response {
    
    constructor(res) {
        this.response = res;
        
        res.on('data', data => this.onData(data));
        res.on('end', () => this.onEnd());
    }
    
    get status() {
        return this.response.statusCode
    }
    
    onData(data) {}
    onEnd() {}
    
}

export default Response;