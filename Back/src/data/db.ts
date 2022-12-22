import mongoose from 'mongoose';

export const startDatabase = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}${process.env.MONGO_DB}`);
};
