import { Request, Response } from 'express';
import httpStatus from 'http-status';
import errors from '../../utils/constants/errors';
import { createErrorResponse } from '../../utils/functions';

const pageNotFoundHandler = (req: Request, res: Response) => {
  console.log('bad api request', req.path);
  res
    .status(httpStatus.NOT_FOUND)
    .json(
      createErrorResponse(
        httpStatus.NOT_FOUND,
        errors.not_found,
        undefined,
        '404 - Page not found',
      ),
    );
};

export default pageNotFoundHandler;
