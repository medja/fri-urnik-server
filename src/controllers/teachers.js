import { Controller } from '../base';

class TeachersController extends Controller {
    
    static routes = {
        '/teachers':                'list',
        '/teachers/:id':            'show',
        '/teachers/:id/schedules':  'schedules'
    };
    
    
    schedules() {
        
    }
    
}

export default TeachersController;