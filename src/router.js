import { Router } from 'express';
import routes from './routes';

const router = Router();

// Enable CORS for the API
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Add API routes
for (const { method, path, handler } of routes) {
    router[method](path, handler);
}

export default router;