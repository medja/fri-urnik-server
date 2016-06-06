import { escapeRegExp } from 'lodash';

import { Builder } from '../base';
import { Activity, Classroom, Group, Teacher } from '../models';

const Models = {
    subject: Activity,
    classroom: Classroom,
    group: Group,
    teacher: Teacher
};

class ScheduleIndexBuilder extends Builder {
    
    constructor(type, initial) {
        super();
        
        this.type = type;
        this.Model = Models[type];
        
        this.initial = initial;
        this.pattern = null;
        
        this.id = null;
        this.index = [];
        
        // Title changes to null when inside the title section
        // This marks it as pending for a value
        this.title = false;
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
    
    startTitle() {
        // Only save the title once
        if (!this.title) {
            this.title = null;
        }
    }
    
    endTitle() {
        this.title = this.buffer.join('').trim();
    }
    
    startAttribute(id, type) {
        if (this.active && type === this.type) {
            this.id = id;
        }
    }
    
    endAttribute() {
        // The title must be null and not false!
        if (this.title === null) {
            this.endTitle();
        }
        
        if (this.id != null) {
            this.saveItem();
        }
        
        this.id = null;
        this.buffer = [];
    }
    
    saveItem() {
        // Default to undefined to the field gets discarded if necessary
        let group = undefined;
        const value = this.buffer.join('').trim();
        
        if (this.initial) {
            // If an initial id is provided use the matching group's
            // name as the pattern for the rest of the groups
            if (this.pattern == null && this.id == this.initial) {
                const prefix = value.match(/^(.+?)\d+$/)[1];
                this.pattern = new RegExp(`^${escapeRegExp(prefix)}(\\d+)$`);
            }
            
            const match = value.match(this.pattern);
            
            if (!match) {
                return;
            } else {
                group = parseInt(match[1], 10);
            }
        }
        
        // When using an initial id all of the items have the
        //  same name, just different groups
        this.index.push(new this.Model({
            id: this.id,
            name: this.title || value,
            group: group
        }));
    }
    
}

export default ScheduleIndexBuilder;