import { Controller } from '../base';
import { ScheduleRequest as Request } from '../requests';

import {
    ScheduleParser as Parser,
    ScheduleIndexParser as IndexParser
} from '../parsers';

class TeachersController extends Controller {
    
    static routes = {
        '/teachers':                'list',
        '/teachers/:id':            'show',
        '/teachers/:id/schedules':  'schedules'
    };
    
    async list() {
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.index();
        
        const parser = new IndexParser('teacher');
        const index = await parser.parse(response);
        
        return index;
    }
    
    async schedules() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'teacher');
        
        const parser = new Parser(id, 'teacher');
        const schedule = await parser.parse(response);
        
        return schedule;
    }
    
}

export default TeachersController;