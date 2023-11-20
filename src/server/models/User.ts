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
  invalidTokenThreshold?: Date;
  createdAt: Date;
  updatedAt: Date;
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
    invalidTokenThreshold: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

schema.virtual('id').get(function () {
  return this._id;
});

schema.set('toJSON', {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export const User = model<IUserDocument, IUserModel>('User', schema);
