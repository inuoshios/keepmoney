import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import { createBudgetInput, createBudgetSchema } from '../schema/budget.schema';
import { createBudget, getAllBudget } from '../services/budget.services';

const router = express.Router();

router.route("/budget")
    .post(authenticateRequest, requireUser, validate(createBudgetSchema),
        async (req: Request<{}, {}, createBudgetInput['body']>, res: Response) => {
            req.body.userId = res.locals.user.id;
            const budget = await createBudget(req.body);
            res.status(StatusCodes.CREATED).json({ msg: "success", data: budget });
        }
    )
    .get(authenticateRequest, requireUser,
        async (_: Request, res: Response) => {
            const id = res.locals.user.id;
            const budget = await getAllBudget({ userId: id });

            res.status(StatusCodes.OK).json({ msg: "success", data: budget });
        }
    );

export {
    router as budgetRouter
};