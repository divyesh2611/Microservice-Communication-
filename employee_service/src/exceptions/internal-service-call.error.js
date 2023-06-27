class InternalServiceCallError extends Error {
    constructor(...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InternalServiceCallError);
        }

        this.name = 'InternalServiceCallError';
        // Custom debugging information
        this.httpStatusCode = 503;
        this.date = new Date();
    }
}
module.exports = InternalServiceCallError;
