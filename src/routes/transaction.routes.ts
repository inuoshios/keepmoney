import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import { CreateTransactionInput, createTransactionSchema } from '../schema/transaction.schema';
import { findSingleBudget } from '../services/budget.services';
import { createTransaction, getTransactions } from '../services/transaction.services';

const router = express.Router();

router.route("/budget/:budgetId/transactions")
    .post(authenticateRequest, requireUser, validate(createTransactionSchema),
        async (req: Request<CreateTransactionInput['params'], {}, CreateTransactionInput['body']>, res: Response) => {
            const { budgetId } = req.params;
            const owner = res.locals.user.id;

            const budget = await findSingleBudget({ budgetId });
            if (!budget) {
                throw new Error("budget not found");
            }

            if (String(budget.userId) !== owner) {
                throw new Error('unauthenticated');
            }

            req.body.owner = budget._id;

            const transaction = await createTransaction({ ...req.body });

            if (transaction.type === "Credit") {
                budget.amount = Number(budget.amount) + Number(transaction.amount);
            } else if (transaction.type === "Expenses") {
                budget.amount = Number(budget.amount) - Number(transaction.amount);
            }

            budget.transactions.push(transaction);

            budget.save();

            res.status(StatusCodes.OK).json({ msg: "success", data: transaction });
        }
    ).
    get(authenticateRequest, requireUser,
        async (req: Request, res: Response) => {
            const { budgetId } = req.params;
            const user = res.locals.user.id;

            const budget = await findSingleBudget({ budgetId });
            if (!budget) {
                throw new Error("budget not found");
            }

            if (String(budget.userId) !== user) {
                throw new Error('unauthenticated');
            }

            const transaction = await getTransactions({ owner: budget._id })

            res.status(StatusCodes.OK).json({ msg: "success", transaction })
        }
    );

router.route("/budget/:budgetId/transactions/:transactionId")
    .get(authenticateRequest, requireUser,
        async => { }
    )
    .patch(authenticateRequest, requireUser,
        async => { }
    )
    .delete(authenticateRequest, requireUser,
        async => { }
    )


export {
    router as transactionRouter
};