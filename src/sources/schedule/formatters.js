import { startCase, capitalize } from 'lodash';

// Activity: ACTIVITY_NAME (SOME_ID)_TYPE
const ACTIVITY = /^(.*)\s*\(\d+\w?\)_\w{1,2}$/;
// Group: YEAR. letnik, PROGRAM LEVEL, skupina GROUP
const GROUP = /^(\d)\. letnik, (.*?)(?: ([I\d]+)[.-]?\s?st.*?)?(?:, skupina (\d+))?$/;

// Formats the activity name
function formatActivity(allocation) {
    // Extract the id and short activity name
    const [ id, activity ] = allocation.activity;
    
    // Try to extract the full activity name from the description
    const description = allocation.description.filter(line => line);
    const match = description[2].match(ACTIVITY);
    
    // Return an object (id, name) pair for the activity
    return { [id]: match ? match[1] : activity };
}

// Formats a person's full name
function formatName(name) {
    // Names may be reversed and delimitered by commas
    return name.split(', ').reverse().map(formatNamePart).join(' ');
}

// Formats part of a person's name
function formatNamePart(part) {
    // Names may contain dashes and may not be capitalized
    return part.toLowerCase().split('-').map(startCase).join('-');
}

// Formats the schedule title
function formatTitle(title) {
    // Check if this is an activity
    const activity = title.match(ACTIVITY);
    
    if (activity) {
        return activity[1];
    }
    
    // Check if this is a group or a program
    const group = title.match(GROUP);
    
    if (group) {
        return formatGroup(group);
    }
    
    // Check if this is a person's name
    if (title.includes(',')) {
        return formatName(title);
    }
    
    // Check if this is a registration number
    if (title.match(/^\d+$/)) {
        return `VŠ: ${title}`;
    }
    
    return title;
}

// Formats a group's or a program's name
function formatGroup([ , year, program, level, group ]) {
    // Check if this is a numbered group
    if (group != null) {
        return `${group}. skupina`;
    }
    
    return `${formatProgram(program)} ${year}`;
}

// Formats a program's name
function formatProgram(name) {
    // Remove words that can not be used in acronyms
    const parts = name.split(' ').filter(part => part !== 'in');
    // If the name contains a level it will be the the last word
    const level = parts[parts.length - 1].replace(/\./g, '');

    // Check if this isn't a normal study program
    if (parts > 4 || level !== level.toUpperCase()) {
        // Find a substring of words ending with a verb
        const match = name.match(/^.*?i\b/);
        
        return startCase((match ? match[0] : parts[0]).toLowerCase());
    }
    
    // If the program's name is only one letter just capitalize it
    if (parts.length == 1) {
        return capitalize(parts[0]);
    }
    
    // If the program's name is a study program create an acronym
    return `${formatAcronym(parts.slice(0, -1))} ${level}`;
}

// Creates an acronym from the first letters of each word
function formatAcronym(words) {
    const letters = do {
        // In case of only one word try to use the first two syllables
        if (words.length == 1) {
            words[0].match(/^(.).{2,}?[aeiou](.)/).slice(1);
        } else {
            words.map(part => part[0]);
        }
    };
    
    return letters.join('').toUpperCase();
}

export { formatActivity, formatName, formatTitle };