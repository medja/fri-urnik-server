import { Controller } from '../base';
import { ScheduleRequest as Request } from '../requests';

import {
    ScheduleParser as Parser,
    ScheduleIndexParser as IndexParser
} from '../parsers';

class ProgramsController extends Controller {
    
    static routes = {
        '/programs':             'list',
        '/programs/:id':         'show',
        '/programs/:id/groups':  'groups'
    };
    
    async list() {
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.index();
        
        const parser = new IndexParser('group');
        const index = await parser.parse(response);
        
        return index;
    }
    
    async groups() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'group');
        
        const parser = new Parser(id, 'group');
        const schedule = await parser.parse(response);
        
        return schedule.groups;
    }
    
}

export default ProgramsController;