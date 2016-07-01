import { Builder } from '../base';
import { Activity, Allocation, Classroom, Group, Schedule, Teacher } from '../models';

const DAYS = [ 'MON', 'TUE', 'WED', 'THU', 'FRI' ];

class ScheduleBuilder extends Builder {
    
    constructor(id, type) {
        super();
        
        this.schedule = new Schedule(id, type);
    }
    
    get result() {
        return this.schedule;
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
    
    startAllocation(types, duration) {
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
            duration: parseInt(duration, 10),
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
                if (this.schedule.parent.name == null) {
                    this.schedule.parent.name = value;
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
                    id: this.id
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
        
        this.schedule.add(this.allocation);
        this.allocation = null;
        
    }
    
    endHour() {
        this.hour = null;
    }
    
}

export default ScheduleBuilder;