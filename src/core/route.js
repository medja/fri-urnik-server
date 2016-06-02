import Exception from './exception';

// Route decorator
function route(method, path, controller) {
    async function handler(req, res) {
        try {
            res.json(await controller(req, res));
        } catch (exception) {
            // Display a custom exception or an 500 internal error
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
    
    return { method, path, handler };
}

export default route;