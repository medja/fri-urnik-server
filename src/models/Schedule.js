import { sortBy } from 'lodash';

import { Model } from '../base';

import Activity from './Activity';
import Classroom from './Classroom';
import Group from './Group';
import Student from './Student';
import Teacher from './Teacher';

const Parents = {
    activity: Activity,
    classroom: Classroom,
    group: Group,
    student: Student,
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