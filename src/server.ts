import config from './config';
import { database } from './utils/connect';
import app from './app';

const run = async () => {
    try {
        await database(config.mongoUri);
        app.listen(config.port, () => console.info(`listening at port ${config.port}`));
    } catch (e) {
        console.error((e as Error).message);
    }
};

run();