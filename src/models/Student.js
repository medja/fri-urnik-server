import { Model } from '../base';

const NAME = Symbol('NAME');

class Student extends Model {
    
    get name() {
        return this[NAME];
    }
    
    set name(value) {
        if (/^\d+$/.test(value)) {
            this[NAME] = `VŠ: ${value}`;
        } else {
            this[NAME] = value;
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
    
}

export default Student;