import Config from './config';
import Parser from './parser';
import Programs from './programs';

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
    
    programs(userAgent = '') {
        const url = this.config.baseUrl;
        const parser = new Programs(userAgent);
        
        return parser.parse(url);
    }
    
    groups() {
        
    }
    
}

export default Schedule;