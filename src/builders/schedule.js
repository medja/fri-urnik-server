import { Builder } from '../base';
import { Activity, Allocation, Classroom, Group, Schedule, Teacher } from '../models';

const DAYS = [ 'MON', 'TUE', 'WED', 'THU', 'FRI' ];

class ScheduleBuilder extends Builder {
    
    constructor() {
        super();
        
        // TODO: Provide schedule id
        this.result = new Schedule();
    }
    
    setActive(name, id = null) {
        this.id = id;
        this.active = name;
        this.buffer = [];
    }
    
    hasAllocation() {
        return this.allocation != null;
    }
    
    startTitle() {
        this.setActive('title');
    }
    
    startHour() {
        this.setActive('hour');
    }
    
    startAllocation(types, timespan) {
        // Check if this is an hour node
        if (types.includes('hour')) {
            this.startHour();
            return;
        }
        
        // Skip empty allocations
        if (!types.includes('allocated') || this.hour == null) {
            return;
        }
        
        this.allocation = new Allocation({
            day: DAYS.indexOf(types[0]),
            hour: this.hour,
            lecture: types.includes('P'),
            timespan: parseInt(timespan, 10),
            
            teachers: [],
            groups: []
        });
    }
    
    startDescription() {
        this.setActive('description');
    }
    
    startAttribute(id, type) {
        this.setActive(type, id);
    }
    
    endAttribute() {
        const value = this.buffer.join('');
        
        switch (this.active) {
            case 'title':
                if (this.title == null) {
                    this.title = value.trim();
                }
                break;
            case 'hour':
                this.hour = parseInt(value.split(':')[0], 10);
                break;
            case 'activity':
                this.allocation.activity = new Activity({
                    id: this.id,
                    name: value.trim()
                });
                break;
            case 'classroom':
                this.allocation.classroom = new Classroom({
                    id: this.id,
                    name: value.trim()
                });
                break;
            case 'teacher':
                this.allocation.teachers.push(new Teacher({
                    id: this.id,
                    name: value.trim()
                }));
                break;
            case 'group':
                this.allocation.groups.push(new Group({
                    id: this.id,
                    name: value.trim()
                }));
                break;
            case 'description':
                const lines = value.split('\n').map(line => line.trim());
                this.allocation.description = lines.filter(line => line);
                break;
        }
        
        this.setActive(null);
    }
    
    endAllocation() {
        if (this.allocation == null) {
            return;
        }
        
        this.result.addAllocation(this.allocation);
        this.allocation = null;
        
    }
    
    endHour() {
        this.hour = null;
    }
    
}

export default ScheduleBuilder;