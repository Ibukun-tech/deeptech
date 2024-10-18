import {
  badRequestException,
  conflictingException,
  forbiddenException,
  internalServerException,
  notFoundException,
  unauthorizedException,
  validationException,
} from "./exception.js";
import * as Httpcode from "./constant.js"


const errorMapping = new Map([
  [notFoundException, Httpcode.NOT_FOUND],
  [badRequestException, Httpcode.BAD_REQUEST],
  [internalServerException, Httpcode.INTERNAL_SERVER_ERROR],
  [unauthorizedException, Httpcode.UNAUTHORIZED],
  [forbiddenException, Httpcode.FORBIDDEN],
  [conflictingException, Httpcode.CONFLICTING_ERROR],
  [validationException, Httpcode.VALIDATION_ERROR],
]);


export class ErrorHandler {
  async handleCustomError(err, res) {
    for (const [ErrorClass, statusCode] of errorMapping) {
      if (err instanceof ErrorClass) {
        return res.status(statusCode).json({
          error: err.name,
          message: err.message,
          success: false,
          details: {},
        });
      }
    }

    
    console.error(err);
    return res.status(Httpcode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERR",
      message:
        "An error occurred while processing your request. Please try again later.",
      success: false,
      details: {},
    });
  }
}
