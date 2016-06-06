import { sortBy } from 'lodash';

import { Model } from '../base';

import Activity from './activity';
import Classroom from './classroom';
import Group from './group';
import Teacher from './teacher';

const Parents = {
    activity: Activity,
    classroom: Classroom,
    group: Group,
    teacher: Teacher
};

class Schedule extends Model {
    
    static defaults = {
        allocations: []
    };
    
    constructor(id, type) {
        super();
        
        this.parent = new Parents[type]({ id });
    }
    
    add(allocation) {
        this.allocations.push(allocation);
        allocation.update();
    }
    
    toJSON() {
        return {
            parent: this.parent,
            allocations: sortBy(this.allocations, [ 'day', 'hour' ])
        };
    }
    
}

export default Schedule;