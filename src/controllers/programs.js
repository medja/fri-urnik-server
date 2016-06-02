import { Controller } from '../base';
import { NotAllowedException } from '../exceptions';

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