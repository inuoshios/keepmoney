import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
  port: parseInt(process.env.PORT!),

  salt: 10,

  mongoUri: process.env.MONGO_URI!,

  jwtSecret: process.env.JWT_SECRET!,

  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRES_AT!,

  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRES_AT!,
};
