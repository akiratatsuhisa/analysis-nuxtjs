import { Document, Model, model, Schema } from 'mongoose';

import { Permission } from '@/interfaces';

export interface IUser {
  googleSub: string;
  googleRefreshToken?: string;
  username: string;
  displayName: string;
  email: string;
  emailConfirmed: boolean;
  firstName?: string;
  lastName?: string;
  permissions: Permission[];
  photoUrl?: string;
  coverUrl?: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

const schema = new Schema<IUserDocument, IUserModel>(
  {
    googleSub: { type: String, required: true, unique: true },
    googleRefreshToken: { type: String },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    emailConfirmed: { type: Boolean, required: true },
    firstName: { type: String },
    lastName: { type: String },
    permissions: { type: [String], required: true },
    photoUrl: { type: String },
    coverUrl: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUserDocument, IUserModel>('User', schema);
