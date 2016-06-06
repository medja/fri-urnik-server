import _, { cloneDeep } from 'lodash';

class Model {
    
    static defaults = {};
    
    constructor(values = {}) {
        const defaults = cloneDeep(this.constructor.defaults);
        
        Object.assign(this, defaults, values);
    }
    
    toJSON() {
        // Sort the object by its keys
        return _(this).toPairs().sortBy(pair => pair[0]).fromPairs().value();
    }
    
}

export default Model;