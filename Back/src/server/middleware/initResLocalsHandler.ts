import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const initResLocalsHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.status = httpStatus.OK;
  res.locals.data = null;
  return next();
};

export default initResLocalsHandler;
