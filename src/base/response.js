class Response {
    
    constructor(res) {
        res.on('data', ::this.onData);
        res.on('end', ::this.onEnd);
    }
    
    onData(data) {}
    onEnd() {}
    
}

export default Response;