import { Controller } from '../base';
import { ScheduleRequest as Request } from '../requests';

import {
    ScheduleParser as Parser,
    ScheduleIndexParser as IndexParser
} from '../parsers';

class ActivitiesController extends Controller {
    
    static routes = {
        '/activities':                'list',
        '/activities/:id':            'show',
        '/activities/:id/schedules':  'schedules'
    };
    
    async list() {
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.index();
        
        const parser = new IndexParser('subject');
        const index = await parser.parse(response);
        
        return index;
    }
    
    async schedules() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'activity');
        
        const parser = new Parser(id, 'activity');
        const schedule = await parser.parse(response);
        
        return schedule;
    }
    
}

export default ActivitiesController;