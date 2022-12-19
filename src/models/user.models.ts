import bcrypt from 'bcrypt';
import mongoose, { Document } from 'mongoose';
import config from '../config';
import { IUser } from '../interface/user';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    socialLinks: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose hooks - executes on save
userSchema.pre<IUser>('save', async function () {
  const salt = await bcrypt.genSalt(config.salt);
  this.password = await bcrypt.hash(this.password, salt);
});

// omit the password from the api
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

// compare user password with the hashed password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean | undefined> {
  const user = this as IUser;

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const UserModel = mongoose.model<IUser & Document>('User', userSchema);

export { UserModel };
