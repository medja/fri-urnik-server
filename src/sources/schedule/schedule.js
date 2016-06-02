import Config from './config';
import Parser from './parser';
import Groups from './groups';
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
    
    // Fetches programs by their study years
    programs(userAgent = '') {
        const url = this.config.baseUrl;
        const parser = new Programs(userAgent);
        
        return parser.parse(url);
    }
    
    // Fetches groups for a program
    groups(program, userAgent = '') {
        const url = this.config.getUrl({ group: program });
        const parser = new Groups(userAgent);
        
        return parser.parse(url, program);
    }
    
}

export default Schedule;