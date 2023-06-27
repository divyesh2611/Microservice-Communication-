class DatabaseError extends Error {
    constructor(...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DatabaseError);
      }
  
      this.name = 'DatabaseError';
      // Custom debugging information
      this.httpStatusCode=400;
      this.date = new Date();
    }
  }
  module.exports=DatabaseError;
  