import { Schedule } from '../sources';
import { Exception, route } from '../core';

// Composes a function for fetching by constraint - key
function fetch(key) {
    // Excepts the url parameter to be names the same as the key
    return async function fetchByKey(req, res) {
        try {
            // Constructs a new schedule for the current date
            const schedule = new Schedule();
            const params = { [key]: req.params[key] };
            const userAgent = req.header('user-agent');
            
            // Fetch the schedule using the user's user agent
            res.json(await schedule.fetch(params, userAgent));
        } catch (exception) {
            // Display the custom exception or an 500 internal error
            if (exception instanceof Exception) {
                res.status(exception.status).json({
                    [exception.name]: exception.message
                });
            } else {
                res.status(500).json({
                    'Error': 'Internal server error'
                });
            }
        }
    };
}

// Define routes for every parameter
export default [
    route('get', '/schedule/:student', fetch('student')),
    route('get', '/schedule/group/:group', fetch('group')),
    route('get', '/schedule/activity/:activity', fetch('activity')),
    route('get', '/schedule/classroom/:classroom', fetch('classroom')),
    route('get', '/schedule/teacher/:teacher', fetch('teacher'))
];