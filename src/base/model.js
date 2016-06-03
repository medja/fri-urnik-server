class Model {
    
    constructor(values = null) {
        if (values != null) {
            Object.assign(this, values);
        }
    }
    
}

export default Model;