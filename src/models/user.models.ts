import mongoose, { Document } from "mongoose";
import bcrypt from 'bcrypt';
import config from '../config'
import { IUser } from '../interface/user'
import { string } from "zod";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: string,
            required: true
        },
        phoneNumber: {
            type: String
        },
        socialLinks: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
);

userSchema.pre<IUser>('save', async function () {
    const salt = await bcrypt.genSalt(config.salt);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean | undefined> {
    const user = this as IUser;

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch
    } catch (err) {
        throw new Error((err as Error).message);
    }
};

const UserModel = mongoose.model<IUser & Document>('User', userSchema);

export {
    UserModel
};