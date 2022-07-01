import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUserModel>('User', UserSchema);
