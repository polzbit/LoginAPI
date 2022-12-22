import { startDatabase } from './db';

const setUpDatabase = async () => {
  await startDatabase();
};

export default setUpDatabase;
