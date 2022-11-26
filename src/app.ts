import express, { Request, Response } from 'express';
import { notFound } from './middleware/notFound';
import { budgetRouter } from './routes/budget.routes';
import { transactionRouter } from './routes/transaction.routes';
import { userRouter } from './routes/user.routes';

const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ msg: "Keepmoney API" });
});

app.use('/api', [userRouter, budgetRouter, transactionRouter]);

app.use(notFound);

export default app;