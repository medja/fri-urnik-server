import { toPairs } from 'lodash';

import Exception from './exception';

class Schedule {
    
    // Creates a new schedule configuration
    // Defaults to the active semester's schedule
    // Acceps a date or a year and semester pair
    constructor(year = this.findYear(), semester = this.findSemester()) {
        if (year instanceof Date) {
            this.year = this.findYear(year);
            this.semester = this.findSemester(year);
        } else {
            this.year = this.parseYear(year);
            this.semester = this.parseSemester(semester);
        }
    }
    
    // Reterns the schedule year using a date
    findYear(today = new Date()) {
        // Year starts in october
        if (today.getMonth() < 9) {
            return today.getFullYear() - 1;
        } else {
            return today.getFullYear();
        }
    }
    
    // Returns the schedule semeter using a date
    findSemester(date = new Date()) {
        const month = date.getMonth();
        
        // First semester is october through january
        // Second semester is january through september
        if (month === 0 || month > 8) {
            return 0;
        } else {
            return 1;
        }
    }
    
    // Normalizes the year to a 4 digit number
    parseYear(year) {
        year = parseInt(year, 10);
        
        if (Number.isNaN(year)) {
            throw new Exception(`Invalid year: ${year}`);
        }
        
        // Allow short year formats
        if (year < 100) {
            year += (new Date().getFullYear() / 100 | 0) * 100;
        }
        
        return year;
    }
    
    
    // Normalizes the semester to 0 for the winter and 1 for the summer semester
    parseSemester(semester) {
        if (semester === 0 || semester === 'winter') {
            return 0;
        } if (semester === 1 || semester === 'summer') {
            return 1;
        }
        
        throw new Exception(`Invalid semester: ${semester}`);
    }
    
    // Build the base schedule url for the selected year and semester
    get baseUrl() {
        const semester = this.semester === 0 ? 'zimski' : 'letni';
        const schedule = `${this.year}_${this.year + 1}_${semester}`;
        
        return `https://urnik.fri.uni-lj.si/timetable/${schedule}/`;
    }
    
    // Constructs a schedule url using the parameters
    getUrl(params) {
        const query = toPairs(params).map(param => param.join('=')).join('&');
        
        return `${this.baseUrl}allocations?${query}`;
    }
    
}

export default Schedule;