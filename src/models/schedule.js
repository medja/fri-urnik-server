import { Model } from '../base';

class Schedule extends Model {
    
    constructor(values) {
        super(values);
        
        this.list = [];
    }
    
    addAllocation(allocation) {
        this.list.push(allocation);
    }
    
}

export default Schedule;