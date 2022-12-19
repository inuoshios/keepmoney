import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/errors';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later!',
  };

  switch (true) {
    case err.code && err.code === 11000:
      // @ts-ignore
      customError.message = `${Object.values(
        err.keyValue
      )} has been taken, please choose another email`;
      customError.statusCode = StatusCodes.BAD_REQUEST;
      break;
    case err.name === 'CastError':
      // @ts-ignore
      customError.message = `item with this id does not exist: ${err.value}`;
      customError.statusCode = StatusCodes.NOT_FOUND;
      break;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};
