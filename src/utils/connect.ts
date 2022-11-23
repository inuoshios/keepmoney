import mongoose from "mongoose";

export const database = async (uri: string) => {
    try {
        await mongoose.connect(uri, {
            keepAlive: true,
            connectTimeoutMS: 3000,
            serverSelectionTimeoutMS: 5000,
        });
        console.info('connected to the database');
    } catch (e) {
        console.error('could not connect to the database');
        throw new Error((e as Error).message);
    }
};