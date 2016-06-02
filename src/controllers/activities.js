import { Controller } from '../base';
import { NotAllowedException } from '../exceptions';

class ActivitiesController extends Controller {
    
    static routes = {
        '/activities':                'list',
        '/activities/:id':            'show',
        '/activities/:id/schedules':  'schedules'
    };
    
    schedules() {
        
    }
    
}

export default ActivitiesController;