import { Controller } from '../base';
import { ScheduleParser as Parser } from '../parsers';
import { ScheduleRequest as Request } from '../requests';

class GroupsController extends Controller {
    
    static routes = {
        '/groups':                'list',
        '/groups/:id':            'show',
        '/groups/:id/schedules':  'schedules'
    };
    
    async schedules() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'group');
        
        const parser = new Parser(id, 'group');
        const schedule = await parser.parse(response);
        
        return schedule;
    }
    
}

export default GroupsController;