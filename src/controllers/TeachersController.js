import { Controller } from '../base';
import { ScheduleParser as Parser } from '../parsers';
import { ScheduleRequest as Request } from '../requests';

class TeachersController extends Controller {
    
    static routes = {
        '/teachers':                'list',
        '/teachers/:id':            'show',
        '/teachers/:id/schedules':  'schedules'
    };
    
    
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