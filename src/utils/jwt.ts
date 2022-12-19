import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (
  data: object,
  options: jwt.SignOptions | undefined
) => {
  return jwt.sign(data, config.jwtSecret, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      algorithms: ['RS256'],
    });
    return { payload: decoded, expired: false };
  } catch (e) {
    return {
      payload: null,
      expired: (e as Error).message.includes('jwt expired'),
    };
  }
};
