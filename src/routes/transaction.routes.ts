import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import { CreateTransactionInput, createTransactionSchema } from '../schema/transaction.schema';
import { findSingleBudget } from '../services/budget.services';
import { createTransaction } from '../services/transaction.services';

const router = express.Router();

router.post("/budget/:budgetId/transactions", authenticateRequest, requireUser, validate(createTransactionSchema),
    async (req: Request<CreateTransactionInput['params'], {}, CreateTransactionInput['body']>, res: Response) => {
        const { budgetId } = req.params;
        const owner = res.locals.user

        const budget = await findSingleBudget({ _id: budgetId, userId: owner });
        if (!budget) {
            throw new Error("budget not found");
        }

        req.body.owner = budget._id;

        const transaction = await createTransaction({ ...req.body });

        switch (transaction.type) {
            case "Expenses":
                budget.amount = Number(budget.amount) - Number(transaction.amount);
                break;
            case "Credit":
                budget.amount = Number(budget.amount) + Number(transaction.amount);
                break;
        }

        budget.transactions.push({ ...transaction });

        res.status(StatusCodes.OK).json({ msg: "success", data: transaction });
    }
);

export {
    router as transactionRouter
};