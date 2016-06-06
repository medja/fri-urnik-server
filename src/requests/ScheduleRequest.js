import { toPairs } from 'lodash';

import { Request } from '../base';

const ROOT = 'https://urnik.fri.uni-lj.si/timetable';

class ScheduleRequest extends Request {
    
    static getYear(today = new Date()) {
        // Years start in october
        const year = do {
            if (today.getMonth() < 9) {
                today.getFullYear() - 1;
            } else {
                today.getFullYear();
            }
        };
        
        return `${year}_${year + 1}`;
    }
    
    static getSemester(today = new Date()) {
        const month = today.getMonth();
        
        // Winter semester is october through january
        // Summer semester is january through september
        if (month === 0 || month > 8) {
            return 'zimski';
        } else {
            return 'letni';
        }
    }
    
    static getUrl(params = null) {
        const today = new Date();
        
        const year = this.getYear(today);
        const semester = this.getSemester(today);
        
        const base = `${ROOT}/${year}_${semester}`;
        
        if (params == null) {
            return base;
        }
        
        const query = toPairs(params).map(param => param.join('=')).join('&');
        
        return `${base}/allocations?${query}`;
    }
    
    schedule(id, type) {
        // Find the url for the resource
        return this.get(this.constructor.getUrl({ [type]: id }));
    }
    
}

export default ScheduleRequest;