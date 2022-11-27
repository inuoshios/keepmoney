import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { generateToken, verifyToken } from "../utils/jwt";
import { getSingleUser } from "./user.services";

// renewAccessToken function is used to generate a new accessToken
export const renewAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    const payload = verifyToken(refreshToken) as JwtPayload;

    if (!payload) {
        throw new Error('refresh token is empty');
    }

    const user = await getSingleUser({ _id: payload.id });

    if (!user) {
        throw new Error('user with this id not found');
    }

    const accessToken = generateToken({ id: user._id, email: user.email }, { expiresIn: config.accessTokenExpiry });

    return accessToken;
};