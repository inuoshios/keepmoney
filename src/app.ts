import express from 'express';
import config from './config';
import { notFound } from './middleware/notFound';
import { database } from './utils/connect';

const app = express();

app.use(express.json());

app.use(notFound);

const run = async () => {
    try {
        await database(config.mongoUri);
        app.listen(config.port, () => console.info(`listening at port ${config.port}`));
    } catch (e) {
        console.error((e as Error).message);
    }
};

run();