import { DocumentDefinition } from "mongoose";
import config from "../config";
import { UserLogin, UserRegister } from "../interface/user";
import { UserModel } from "../models/user.models";
import { generateToken } from "../utils/jwt";

export const createUser = async (data: DocumentDefinition<UserRegister>) => {
    try {
        return UserModel.create(data);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export const loginUser = async (body: DocumentDefinition<UserLogin>) => {
    const email: string = body.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error('user does not exist');
    }

    const isValid = await user.comparePassword(body.password);
    if (!isValid) {
        throw new Error('password does not match')
    }

    const accessToken = generateToken({ id: body._id, email: body.email }, { expiresIn: config.accessTokenExpiry });

    const refreshToken = generateToken({ id: body._id, email: body.email }, { expiresIn: config.refreshTokenExpiry });

    return { user, accessToken, refreshToken };
};