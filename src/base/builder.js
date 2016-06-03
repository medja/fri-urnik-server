class Builder {
    
    buffer = [];
    
    // Stores a partial text node
    setValue(value) {
        this.buffer.push(value);
    }
    
}

export default Builder;