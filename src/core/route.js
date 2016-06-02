// Route decorator
function route(method, path, handler) {
    return { method, path, handler };
}

export default route;