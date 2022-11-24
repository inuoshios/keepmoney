import express from 'express';
import config from './config';
import { notFound } from './middleware/notFound';
import { budgetRouter } from './routes/budget.routes';
import { transactionRouter } from './routes/transaction.routes';
import { userRouter } from './routes/user.routes';
import { database } from './utils/connect';

const app = express();

app.use(express.json());

app.use('/api', [userRouter, budgetRouter, transactionRouter]);

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