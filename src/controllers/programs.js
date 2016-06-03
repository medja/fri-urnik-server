import { Controller } from '../base';

class ProgramsController extends Controller {
    
    static routes = {
        '/programs':             'list',
        '/programs/:id':         'show',
        '/programs/:id/groups':  'groups'
    };
    
    list() {
        
    }
    
    groups() {
        
    }
    
}

export default ProgramsController;