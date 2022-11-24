import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (data: object, options: jwt.SignOptions | undefined) => {
    return jwt.sign(data, config.jwtSecret, {
        ...(options && options),
        algorithm: "RS256"
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret, { algorithms: ["RS256"] });
};