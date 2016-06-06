import { Controller } from '../base';
import { ScheduleParser as Parser } from '../parsers';
import { ScheduleRequest as Request } from '../requests';

class ActivitiesController extends Controller {
    
    static routes = {
        '/activities':                'list',
        '/activities/:id':            'show',
        '/activities/:id/schedules':  'schedules'
    };
    
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