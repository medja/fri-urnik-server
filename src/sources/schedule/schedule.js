import Config from './config';
import Parser from './parser';

class Schedule {
    
    // Creates a schedule configuration
    constructor(year, semester) {
        this.config = new Config();
    }
    
    // Fetches and processes a schedule
    fetch(params, userAgent = '') {
        const url = this.config.getUrl(params);
        const parser = new Parser(userAgent);
        
        return parser.parse(url);
    }
    
}

export default Schedule;