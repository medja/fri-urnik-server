import { Model } from '../base';

const PATTERN = /^(.*?)(?:\(.+\))?_(\w+)$/;

const NAME = Symbol('NAME');

class Activity extends Model {
    
    get name() {
        return this[NAME];
    }
    
    set name(value) {
        const match = value.match(PATTERN);
        
        if (match == null) {
            this[NAME] = value;
            return;
        }
        
        const [ name, type ] = match.slice(1);
        
        this[NAME] = name;
        this.type = type;
    }
    
    get lecture() {
        if (this.type == null) {
            return undefined;
        } else {
            return this.type === 'P';
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            lecture: this.lecture
        };
    }
    
}

export default Activity;