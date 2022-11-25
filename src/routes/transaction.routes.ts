import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { findSingleBudget } from '../services/budget.services';
import { createTransaction } from '../services/transaction.services';

const router = express.Router();

router.post("/budget/:budgetId/transactions", authenticateRequest, requireUser,
    async (req: Request, res: Response) => {
        const userId = res.locals.user.id
        const { budgetId } = req.params;

        const body = req.body;

        const budget = await findSingleBudget({ _id: budgetId, userId });
        if (!budget) {
            throw new Error("budget not found");
        }
        if (!budget) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "budget does not exist" });
        }

        const transaction = await createTransaction({ ...body, budget });

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