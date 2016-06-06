import { Controller } from '../base';
import { ScheduleRequest as Request } from '../requests';

import {
    ScheduleParser as Parser,
    ScheduleIndexParser as IndexParser
} from '../parsers';

class ClassroomsController extends Controller {
    
    static routes = {
        '/classrooms':                'list',
        '/classrooms/:id':            'show',
        '/classrooms/:id/schedules':  'schedules'
    };
    
    async list() {
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.index();
        
        const parser = new IndexParser('classroom');
        const index = await parser.parse(response);
        
        return index;
    }
    
    async schedules() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'classroom');
        
        const parser = new Parser(id, 'classroom');
        const schedule = await parser.parse(response);
        
        return schedule;
    }
    
}

export default ClassroomsController;