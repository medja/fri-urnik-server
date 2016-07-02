import { flatMap, sortBy, uniqBy } from 'lodash';

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
    
    get groups() {
        const fields = [ 'name', 'year', 'level' ];
        
        const groups = flatMap(this.allocations, allocation => {
            return allocation.groups.filter(allocation => {
                if (allocation.id == this.parent.id) {
                    return false;
                }
                
                if (allocation.group == null) {
                    return false;
                }
                
                return fields.every(field => {
                    return allocation[field] == this.parent[field];
                });
            });
        });
        
        return {
            index: sortBy(uniqBy(groups, 'id'), [
                // Make sure groups without activities and tags sorted first
                (group => group.activity || ''),
                (group => group.tag || ''),
                'group'
            ])
        };
    }
    
    toJSON() {
        return {
            parent: this.parent,
            allocations: sortBy(this.allocations, [ 'day', 'hour' ])
        };
    }
    
}

export default Schedule;