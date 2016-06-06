class Builder {
    
    buffer = [];
    
    get result() {
        return null;
    }
    
    // Stores a partial text node
    setValue(value) {
        this.buffer.push(value);
    }
    
}

export default Builder;