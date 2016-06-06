import { Controller } from '../base';
import { ScheduleParser as Parser } from '../parsers';
import { ScheduleRequest as Request } from '../requests';

class StudentsController extends Controller {
    
    static routes = {
        '/students':                'list',
        '/students/:id':            'show',
        '/students/:id/schedules':  'schedules'
    };
    
    async schedules() {
        const id = this.param('id');
        const userAgent = this.header('user-agent');
        
        const request = new Request(userAgent);
        const response = await request.schedule(id, 'student');
        
        const parser = new Parser(id, 'student');
        const schedule = await parser.parse(response);
        
        return schedule;
    }
    
}

export default StudentsController;