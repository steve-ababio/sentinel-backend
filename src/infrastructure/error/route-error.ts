export class RouteError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message); // Call the base class constructor with the message
      this.status = status; // Set the custom status code
      this.message = message;
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
  }