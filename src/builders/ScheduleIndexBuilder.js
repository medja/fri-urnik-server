import { Builder } from '../base';
import { Activity, Classroom, Group, Teacher } from '../models';

const Models = {
    subject: Activity,
    classroom: Classroom,
    group: Group,
    teacher: Teacher
};

class ScheduleIndexBuilder extends Builder {
    
    constructor(type) {
        super();
        
        this.type = type;
        this.Model = Models[type];
        
        this.pattern = null;
        
        this.id = null;
        this.index = [];
        
        this.active = false;
    }
    
    get result() {
        return {
            index: this.index
        };
    }
    
    startSection() {
        this.active = true;
    }
    
    endSection() {
        this.active = false;
    }
    
    startAttribute(id, type) {
        if (this.active && type === this.type) {
            this.id = id;
        }
    }
    
    endAttribute() {
        if (this.id != null) {
            this.saveItem();
        }
        
        this.id = null;
        this.buffer = [];
    }
    
    saveItem() {
        // Default to undefined to the field gets discarded if necessary
        const value = this.buffer.join('').trim();
        
        this.index.push(new this.Model({
            id: this.id,
            name: value
        }));
    }
    
}

export default ScheduleIndexBuilder;