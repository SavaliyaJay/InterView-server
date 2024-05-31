const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Use the provided status code, or default to 500
    
    switch (statusCode) {
        case 400:
            res.status(statusCode).json({
                title: "Bad Request",
                message: err.message || "The request cannot be fulfilled due to bad syntax.",
                stackTrace: err.stack
            });
            break;

        case 401:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message || "Authentication is required and has failed or has not been provided.",
                stackTrace: err.stack
            });
            break;

        case 402:
            res.status(statusCode).json({
                title: "Payment Required",
                message: err.message || "Payment is required and has failed, or payment information is missing or invalid.",
                stackTrace: err.stack
            });
            break;

        case 403:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message || "You do not have permission to access the requested resource.",
                stackTrace: err.stack
            });
            break;

        case 404:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message || "The requested resource could not be found on the server.",
                stackTrace: err.stack
            });
            break;

        case 500:
            res.status(statusCode).json({
                title: "Internal Server Error",
                message: err.message || "The server encountered an internal error and was unable to complete your request.",
                stackTrace: err.stack
            });
            break;

        default:
            res.status(statusCode).json({
                title: "Unknown Error",
                message: "An unknown error occurred.",
                stackTrace: err.stack
            });
            break;
    }
};

module.exports = errorHandler;
