import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { getSingleUser } from '../services/user.services';
import { NotFoundError, UnauthorizedError } from '../utils/errors';
import { generateToken, verifyToken } from '../utils/jwt';

// authenticateRequest is a middleware which is called when request are being made to specific routes
export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    accessToken,
    refreshToken,
  }: { accessToken: string; refreshToken: string } = req.cookies;

  if (!accessToken) {
    throw new UnauthorizedError('unauthorized to access this resource');
  }

  const { payload, expired } = verifyToken(accessToken);

  if (payload) {
    // @ts-ignore
    req.user = (payload as JwtPayload).id;
    return next();
  }

  const { payload: refresh } =
    expired && refreshToken ? verifyToken(refreshToken) : { payload: null };

  if (!refresh) {
    throw new UnauthorizedError('refresh token not valid');
  }

  // @ts-ignore
  const user = await getSingleUser({ _id: refresh.id });

  if (!user) {
    throw new NotFoundError('user with this id not found');
  }

  const newAccessToken = generateToken(
    { id: user._id, email: user.email },
    { expiresIn: config.accessTokenExpiry }
  );

  const newPayload = verifyToken(newAccessToken).payload;

  // @ts-ignore
  req.user = (newPayload as JwtPayload).id;

  next();
};
