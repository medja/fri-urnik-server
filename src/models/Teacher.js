import { startCase } from 'lodash';

import { Model } from '../base';

const NAME = Symbol('NAME');

class Teacher extends Model {
    
    get name() {
        return this[NAME];
    }
    
    set name(value) {
        // First and last names are divided by a comma
        this[NAME] = value.split(', ').reverse().map(name => {
            // Multiple names can be joined together with dashes
            return name.split('-').map(part => {
                return startCase(part.toLowerCase());
            }).join('-');
        }).join(' ');
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
    
}

export default Teacher;