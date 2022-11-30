import 'express-async-errors';
import express, { Request, Response } from 'express';
import { notFound } from './middleware/notFound';
import { budgetRouter } from './routes/budget.router';
import { transactionRouter } from './routes/transaction.router';
import { userRouter } from './routes/user.router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authenticateRequest } from './middleware/authentication';
import { errorHandlerMiddleware } from './middleware/errorHandler';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: '*'
}));

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ msg: "Keepmoney API" });
});

app.use('/api', [userRouter]);

app.use(authenticateRequest)

app.use('/api', [budgetRouter, transactionRouter]);

app.use(errorHandlerMiddleware);

app.use(notFound);

export default app;