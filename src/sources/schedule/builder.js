import { formatActivity, formatName, formatTitle } from './formatters';

// Day of week constants
const DAYS = [ 'MON', 'TUE', 'WED', 'THU', 'FRI' ];

class Builder {
    
    // Prepares all the data structures
    constructor() {
        // Id of the current processing node
        this.id = null;
        // Schedule title
        this.title = null;
        // Current processing node type
        this.active = null;
        // Text node buffer (not all content is parsed in one piece)
        this.buffer = [];
        // Aggregated schedule data
        this.schedule = {};
    }
    
    // Sets a new active node with an optional identifier
    setActive(name, id = null) {
        this.id = id;
        this.active = name;
        this.buffer = [];
    }
    
    // Marks the entry into the schedule title node
    startTitle() {
        this.setActive('title');
    }
    
    // Checks if the parser is inside an allocation node
    hasAllocation() {
        return this.allocation != null;
    }
    
    // Marks the entry into an allocation node
    startAllocation({ ['class']: className, rowspan }) {
        const classNames = className.split(' ');
        
        // A special type of an allocation node is the time node
        if (classNames.includes('hour')) {
            this.startHour();
            return;
        }
        
        // Make sure this is not an empty allocation node
        if (!classNames.includes('allocated')) {
            return;
        }
        
        // Prepare the allocation data structure
        this.allocation = {
            // The day, lecture and timestamp should already be present
            day: DAYS.indexOf(classNames[0]),
            lecture: classNames.includes('P'),
            timespan: parseFloat(rowspan, 10),
            groups: [],
            teachers: {},
            description: []
        };
    }
    
    // Marks the entry into a time node
    startHour() {
        this.setActive('hour');
    }
    
    // Marks the entry into an allocation meta data node
    startMeta({ ['class']: className, href }) {
        this.setActive(className, href.split('=')[1]);
    }
    
    // Marks the entry into the allocation description node
    startDescription() {
        this.setActive('description');
    }
    
    // Processes a new group node
    addGroup({ href }) {
        this.allocation.groups.push(href.split('=')[1]);
    }
    
    // Processes a partial text node
    setValue(value) {
        this.buffer.push(value);
    }
    
    // Processes the schedule title node
    setTitle(value) {
        // Out of all the title nodes the first one is the actual schedule title
        if (this.title == null) {
            this.title = formatTitle(value);
        }
    }
    
    // Marks the end of an allocation node
    endAllocation() {
        // All the data has been collected so it's time to save the allocation
        this.saveAllocation();
        this.allocation = null;
    }
    
    // Marks the end of a time node
    endHour() {
        this.hour = null;
    }
    
    // Marks the end of a meta node
    endMeta() {
        // This also marks the end of the last text node for this meta value
        const value = this.buffer.join('');
        
        // Depending on the meta type set the appropriate value
        switch (this.active) {
            case 'title':
                this.setTitle(value);
                break;
                
            case 'hour':
                // Extract the hour from the time
                this.hour = parseInt(value.split(':'), 10);
                break;
                
            case 'description':
                // The description may semi-random empty lines
                const lines = value.split('\n').map(line => line.trim());
                this.allocation.description = lines.filter(line => line);
                break;
                
            case 'classroom':
                // The classroom is stored as an object (id, name) pair
                this.allocation.classroom = { [this.id]: value.trim() };
                break;
                
            case 'activity':
                // The activity will be formated to an object pair later
                this.allocation.activity = [ this.id, value.trim() ];
                break;
                
            case 'teacher':
                this.allocation.teachers[this.id] = formatName(value);
                break;
        }
        
        this.setActive(null);
    }
    
    // Saves a finished allocation
    saveAllocation() {
        // Discard invalid allocations
        if (this.allocation == null) {
            return;
        }
        
        const day = this.allocation.day;
        const hour = this.hour;
        
        // Create the final allocation data sctructure
        const allocation = {
            timespan: this.allocation.timespan,
            activity: formatActivity(this.allocation),
            classroom: this.allocation.classroom,
            teachers: this.allocation.teachers,
            lecture: this.allocation.lecture,
            groups: this.allocation.groups
        };
        
        // Add an entry for the day if it doesnt't already exist
        if (!this.schedule[day]) {
            this.schedule[day] = {};
        }
        
        // Add an entry for the hour if it doesnt't already exist
        if (!this.schedule[day][hour]) {
            this.schedule[day][hour] = [];
        }
        
        // Store the allocation in the proper day-time slot
        this.schedule[day][hour].push(allocation);
    }
    
    // Returns the currently aggregated schedule
    result() {
        return {
            title: this.title,
            schedule: this.schedule
        };
    }
    
}

export default Builder;