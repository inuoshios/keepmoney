import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validateResource';
import {
    createBudgetInput,
    createBudgetSchema,
    deleteBudgetParams,
    deleteBudgetSchema,
    getSingleBudgetParams,
    getSingleBudgetSchema,
    updateBudgetParams,
    updateBudgetSchema
} from '../schema/budget.schema';
import {
    createBudget,
    deleteBudget,
    findSingleBudget,
    getAllBudget,
    updateBudget
} from '../services/budget.services';

const router = express.Router();

router.route("/budget")
    .post(requireUser, validate(createBudgetSchema),
        async (req: Request<{}, {}, createBudgetInput['body']>, res: Response) => {
            // @ts-ignore
            req.body.userId = req.user.id;
            const budget = await createBudget(req.body);
            res.status(StatusCodes.CREATED).json({ msg: "success", data: budget });
        }
    )
    .get(requireUser,
        async (_: Request, res: Response) => {
            // @ts-ignore
            const { id } = req.user;
            const budget = await getAllBudget({ userId: id });

            res.status(StatusCodes.OK).json({ msg: "success", data: budget });
        }
    );

router.route("/budget/:budgetId")
    .get(requireUser, validate(getSingleBudgetSchema),
        async (req: Request<getSingleBudgetParams['params']>, res: Response) => {
            // @ts-ignore
            const { owner } = req.user;
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
    .patch(requireUser, validate(updateBudgetSchema),
        async (req: Request<updateBudgetParams['params'], {}, updateBudgetParams['body']>, res: Response) => {
            const { budgetId } = req.params;
            // @ts-ignore
            const { owner } = req.user;

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
    .delete(requireUser, validate(deleteBudgetSchema),
        async (req: Request<deleteBudgetParams['params']>, res: Response) => {
            const { budgetId } = req.params;
            // @ts-ignore
            const { owner } = req.user;

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