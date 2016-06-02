import ScheduleConfig from './config';
import ScheduleParser from './parser';

class Schedule {
    
    // Creates a schedule configuration
    constructor(year, semester) {
        this.config = new ScheduleConfig();
    }
    
    // Fetches and processes a schedule
    fetch(params, userAgent = '') {
        const url = this.config.getUrl(params);
        const parser = new ScheduleParser(userAgent);
        
        return parser.parse(url);
    }
    
}

export default Schedule;