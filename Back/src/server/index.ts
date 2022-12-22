import * as dotenv from 'dotenv';
import setUpDatabase from '../data';
import { app, setUpAPIRoutes, setUpMiddleWares } from './app';

const startApp = async () => {
  dotenv.config();
  await setUpDatabase();
  setUpAPIRoutes();
  setUpMiddleWares();

  app.listen(process.env.PORT, () => {
    console.log(
      `Express server listening on ${process.env.ORIGIN}:${process.env.PORT}`,
    );
  });
};

startApp();
