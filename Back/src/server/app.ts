import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import apiRouter from './routes/api.route';
import {
  errorHandler,
  responseHandler,
  pageNotFoundHandler,
  initResLocalsHandler,
} from './middleware';

const app = express();

const setUpAPIRoutes = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    }),
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60 * 60 * 1000 * 24, //24 hr
        sameSite: true,
      },
    }),
  );
  app.use(initResLocalsHandler);
  app.use('/api', apiRouter);
};

const setUpMiddleWares = () => {
  app.use(responseHandler);
  app.use(errorHandler);
  app.use(pageNotFoundHandler);
};

const useCustomRoute = (route: string, router: Router) => {
  app.use(route, router);
};

export { app, useCustomRoute, setUpAPIRoutes, setUpMiddleWares };
