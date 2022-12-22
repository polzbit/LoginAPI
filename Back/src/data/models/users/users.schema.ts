import { Schema } from 'mongoose';

export default new Schema({
  id: String,
  email: String,
  hashedPassword: String,
  salt: String,
  verified: Boolean,
  firstName: String,
  lastName: String,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});
