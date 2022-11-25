import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import { CreateTransactionInput, createTransactionSchema } from '../schema/transaction.schema';
import { findSingleBudget } from '../services/budget.services';
import { createTransaction } from '../services/transaction.services';

const router = express.Router();

// this code looks bloated -> refractoring
router.post("/budget/:budgetId/transactions", authenticateRequest, requireUser, validate(createTransactionSchema),
    async (req: Request<CreateTransactionInput['params'], {}, CreateTransactionInput['body']>, res: Response) => {
        const { budgetId } = req.params;

        const budget = await findSingleBudget({ budgetId });
        if (!budget) {
            throw new Error("budget not found");
        }
        if (!budget) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "budget does not exist" });
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


        res.status(StatusCodes.OK).json({ msg: "success", data: transaction });
    }
);

export {
    router as transactionRouter
};