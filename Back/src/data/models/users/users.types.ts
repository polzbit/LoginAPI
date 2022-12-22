import { Document, Model } from 'mongoose';
export interface IUser {
  email: string;
  hashedPassword: string;
  salt: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
