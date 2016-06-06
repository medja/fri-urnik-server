import { Controller } from '../base';

class StudentsController extends Controller {
    
    static routes = {
        '/students':                'list',
        '/students/:id':            'show',
        '/students/:id/schedules':  'schedules'
    };
    
    schedules() {
        
    }
    
}

export default StudentsController;