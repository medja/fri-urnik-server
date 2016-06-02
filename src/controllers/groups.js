import { Controller } from '../base';
import { NotAllowedException } from '../exceptions';

class GroupsController extends Controller {
    
    static routes = {
        '/groups':                'list',
        '/groups/:id':            'show',
        '/groups/:id/schedules':  'schedules'
    };
    
    schedules() {
        
    }
    
}

export default GroupsController;