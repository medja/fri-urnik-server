import { Model } from '../base';

// Matches the year, program name, program level, activity and group number from a description
const PATTERN = /^(\d)\. letnik, (.*?)\.?(?: ([I\d]+)[.-]?\s?st.*?)?(?: \((.+)\))?(?:, skupina.* (\d+))?$/;

const NAME = Symbol('NAME');
const YEAR = Symbol('YEAR');
const LEVEL = Symbol('LEVEL');
const GROUP = Symbol('GROUP');

function formatName(name) {
    const words = name.replace(/[.,]/g, '').split(' ');
    const type = words.slice(-1)[0];
    
    // Shorten the name if it's not a regular program
    if (!isAcronym(type)) {
        words.splice(1);
    }
    
    // Noralize use of uppercase letters
    return words.map(part => {
        // Skip acronyms
        if (part.toUpperCase() === part) {
            return part;
        }
        
        return part[0] + part.substr(1).toLowerCase();
    }).join(' ');
}

function extractShortName(name) {
    const words = name.split(' ').filter(word => word !== 'in');
    const type = words.pop();
    
    // Some programs don't have a type
    if (!isAcronym(type)) {
        // Just use the first word, type in case of only one word
        return words[0] || type;
    }
    
    // Letters for the acronym
    const letters = do {
        if (words.length == 1) {
            // Use the first two syllables if the name only has one word
            words[0].match(/^(.).{2,}?[aeiou](.)/).slice(1);
        } else {
            words.map(part => part[0]);
        }
    };
    
    return `${letters.join('').toUpperCase()} ${type}`;
}

function isAcronym(value) {
    // Make sure it's an all uppercase word
    return value === value.toUpperCase() && value !== value.toLowerCase();
}

class Group extends Model {
    
    get name() {
        return this[NAME];
    }
    
    set name(value) {
        const match = value.match(PATTERN);
        
        if (match == null) {
            this[NAME] = formatName(value);
            return;
        }
        
        // In case of a description extract the rest of the fields
        const [ year, name, level, activity, group ] = match.slice(1);
        
        this.year = year;
        this.level = level;
        this.group = group;
        this.activity = activity;
        
        this[NAME] = formatName(name);
        this.short = extractShortName(this[NAME]);
    }
    
    get year() {
        return this[YEAR];
    }
    
    set year(value) {
        const year = parseInt(value, 10);
        
        if (!isNaN(year)) {
            this[YEAR] = year;
        }
    }
    
    get level() {
        return this[LEVEL];
    }
    
    set level(value) {
        // The study level can be written in roman numerals
        if (/^\I+$/.test(value)) {
            this[LEVEL] = value.length;
        }
        
        const level = parseInt(value, 10);
        
        if (!isNaN(level)) {
            this[LEVEL] = level;
        }
    }
    
    get group() {
        return this[GROUP];
    }
    
    set group(value) {
        const group = parseInt(value, 10);
        
        if (!isNaN(group)) {
            this[GROUP] = group;
        }
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            short: this.short,
            activity: this.activity,
            year: this.year,
            level: this.level,
            group: this.group
        };
    }
    
}

export default Group;