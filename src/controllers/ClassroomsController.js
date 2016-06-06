import { Controller } from '../base';
import { ScheduleParser as Parser } from '../parsers';
import { ScheduleRequest as Request } from '../requests';

class ClassroomsController extends Controller {
    
    static routes = {
        '/classrooms':                'list',
        '/classrooms/:id':            'show',
        '/classrooms/:id/schedules':  'schedules'
    };
    
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