import { Controller } from '../base';

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