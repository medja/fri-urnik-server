import { Router } from 'express';

import * as Controllers from './controllers';

const router = Router();

// Use JSON and enable CORS on all API endpoints
router.use((req, res, next) => {
    res.type('application/json');
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    next();
});

// Register all controllers
for (const Controller of Object.values(Controllers)) {
    const { routes } = Controller;
    
    for (const [ route, handler ] of Object.entries(routes)) {
        // Use the controller's built-in route handler
        router.all(route, Controller.route.bind(Controller, handler));
    }
}

export default router;