import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { renewAccessToken } from '../services/token.services';
import { verifyToken } from '../utils/jwt';

// authenticateRequest is a middleware which is called when request are being made to specific routes
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken }: { accessToken: string, refreshToken: string } = req.cookies;

    if (!accessToken) {
        throw new Error('unauthorized to access this resource');
    }

    try {
        const payload = verifyToken(accessToken) as JwtPayload;
        // @ts-ignore
        req.user = payload.id;

        // check if the payload is expired and if there is a refreshToken
        if (payload.exp && refreshToken) {
            const newAccessToken = await renewAccessToken({ refreshToken });

            // store the new accessToken in the cookie
            res.cookie("accessToken", newAccessToken, {
                maxAge: 900000,
                httpOnly: true
            });

            // the verifyToken function is used to verify if the new accessToken is valid or not
            const newPayload = verifyToken(newAccessToken) as JwtPayload;

            // @ts-ignore
            req.user = newPayload.id;

            return next();
        }

        next();
    } catch (e) {
        throw new Error((e as Error).message);
    }

}