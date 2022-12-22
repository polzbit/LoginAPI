import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { createSuccessResponse } from '../../utils/functions';
import { verifyJWT } from '../../utils/jwt-helpers';
import { UserService } from '../services';

const DEFAULT_COOKIE = {
  maxAge: 60 * 60 * 1000 * 24, // 24 hr
  httpOnly: true,
  secure: true,
  sameSite: true,
};

export default class UserController {
  static async validateEmailToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { token } = req.params;
      const decoded = await UserService.validateEmail({ token });
      res.locals.data = decoded;

      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async validateResetToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { token } = req.params;
      const decoded = verifyJWT(token);
      res.locals.data = decoded;

      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.cookies.token) {
        const decoded = verifyJWT(req.cookies.token);
        res.locals.data = decoded;
      }
      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await UserService.forgotPassword({ email });
      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password, passwordRepeat } = req.body;
      const { error } = await UserService.resetPassword({
        token,
        password,
        passwordRepeat,
      });
      console.log('reset', error);
      if (error) {
        res.locals.data = { error: true };
      }
      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, passwordRepeat } = req.body;
      const { error } = await UserService.register({
        email,
        password,
        passwordRepeat,
      });
      if (error) {
        res.locals.data = { error };
        return res
          .status(res.locals.status)
          .json(createSuccessResponse(res.locals.status, res.locals.data));
      }
      res.locals.status = httpStatus.CREATED;
      return res
        .status(res.locals.status)
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { error, token } = await UserService.login({ email, password });
      if (error) {
        res.locals.data = { error };
        return res
          .status(res.locals.status)
          .json(createSuccessResponse(res.locals.status, res.locals.data));
      }
      return res
        .cookie('token', token, DEFAULT_COOKIE)
        .status(res.locals.status)
        .setHeader('Access-Control-Allow-Credentials', 'true')
        .json(createSuccessResponse(res.locals.status, res.locals.data));
    } catch (error) {
      console.log(error);

      return next(error);
    }
  }
}
