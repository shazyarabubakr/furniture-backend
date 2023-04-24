export default class customError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    // new Error;
    this.status = statusCode;
    this.errorCode = errorCode;
  }
}
