import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateRequest } from '../middleware/authentication';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import { createBudgetInput, createBudgetSchema } from '../schema/budget.schema';
import { createBudget, deleteBudget, findSingleBudget, getAllBudget, updateBudget } from '../services/budget.services';

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

router.route("/budget/:budgetId")
    .get(authenticateRequest, requireUser,
        async (req: Request, res: Response) => {
            const owner = res.locals.user.id;
            const { budgetId } = req.params;
            const budget = await findSingleBudget({ _id: budgetId });
            if (!budget) {
                throw new Error("budget with this Id does not exist");
            }

            if (String(budget.userId) !== owner) {
                throw new Error('unauthorized to access this resource');
            }

            res.status(StatusCodes.OK).json({ data: budget });
        }

    )
    .patch(authenticateRequest, requireUser,
        async (req: Request, res: Response) => {
            const { budgetId } = req.params;
            const owner = res.locals.user.id;

            const findBudget = await findSingleBudget({ budgetId });

            if (!findBudget) {
                throw new Error('budget not found');
            }

            if (String(findBudget.userId) !== owner) {
                throw new Error('unauthorized to update this resource');
            }

            const newBudget = await updateBudget({ budgetId }, { ...req.body }, { new: true, runValidators: true });

            res.status(StatusCodes.OK).json({ msg: "budget updated successfully", budget: newBudget });
        }
    )
    .delete(authenticateRequest, requireUser,
        async (req: Request, res: Response) => {
            const { budgetId } = req.params;
            const owner = res.locals.user.id;

            const findBudget = await findSingleBudget({ budgetId });

            if (!findBudget) {
                throw new Error('budget not found');
            }

            if (String(findBudget.userId) !== owner) {
                throw new Error('unauthorized to update this resource');
            }

            await deleteBudget({ budgetId });

            res.status(StatusCodes.OK).json({ msg: "budget deleted successfully" });
        }
    );

export {
    router as budgetRouter
};