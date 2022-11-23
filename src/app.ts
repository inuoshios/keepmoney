import express from 'express';
import config from './config';

const app = express();

const run = async () => {
    try {
        // connect your database
        app.listen(config.port, () => console.info(`listening at port ${config.port}`));
    } catch (e) {
        console.error((e as Error).message);
    }
};

run();