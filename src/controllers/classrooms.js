import { Controller } from '../base';
import { NotAllowedException } from '../exceptions';

class ClassroomsController extends Controller {
    
    static routes = {
        '/classrooms':                'list',
        '/classrooms/:id':            'show',
        '/classrooms/:id/schedules':  'schedules'
    };
    
    schedules() {
        
    }
    
}

export default ClassroomsController;