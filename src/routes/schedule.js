import { Schedule } from '../sources';
import { route } from '../core';

// Fetches all programs by study years
function programs(req, res) {
    const schedule = new Schedule();
    const userAgent = req.header('user-agent');
    
    // Fetch the programs using the user's user agent
    return schedule.programs(userAgent);
}

// Fetches all groups for a program
function groups(req, res) {
    const schedule = new Schedule();
    const program = req.params.program;
    const userAgent = req.header('user-agent');
    
    // Fetch the groups using the user's user agent
    return schedule.groups(program, userAgent);
}

// Composes a function for fetching by constraint - key
function fetch(key) {
    // Excepts the url parameter to be names the same as the key
    return function fetchByKey(req, res) {
        const schedule = new Schedule();
        const params = { [key]: req.params[key] };
        const userAgent = req.header('user-agent');
        
        // Fetch the schedule using the user's user agent
        return schedule.fetch(params, userAgent);
    };
}

// Define routes for every parameter
export default [
    route('get', '/schedule', programs),
    route('get', '/schedule/groups/:program', groups),
    
    route('get', '/schedule/:student', fetch('student')),
    route('get', '/schedule/group/:group', fetch('group')),
    route('get', '/schedule/activity/:activity', fetch('activity')),
    route('get', '/schedule/classroom/:classroom', fetch('classroom')),
    route('get', '/schedule/teacher/:teacher', fetch('teacher'))
];