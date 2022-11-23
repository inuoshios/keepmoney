import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

export default {
    port: parseInt(process.env.PORT!),

    salt: 10,

    mongoUri: process.env.MONGO_URI!,
}