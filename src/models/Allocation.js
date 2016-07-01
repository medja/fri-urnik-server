import { Model } from '../base';

const ACTIVITY_INDEX = 2;

class Allocation extends Model {
    
    static defaults = {
        groups: [],
        teachers: []
    };
    
    update() {
        if (!this.description) {
            return;
        }
        
        if (this.activity) {
            this.activity.name = this.description[ACTIVITY_INDEX];
        }
        
        this.updateGroups();
    }
    
    updateGroups() {
        const offset = ACTIVITY_INDEX + this.teachers.length + 1;
        
        for (const [ index, group ] of this.groups.entries()) {
            group.name = this.description[offset + index];
        }
    }
    
    toJSON() {
        return {
            day: this.day,
            hour: this.hour,
            duration: this.duration,
            activity: this.activity,
            classroom: this.classroom,
            teachers: this.teachers,
            groups: this.groups
        };
    }
    
}

export default Allocation;