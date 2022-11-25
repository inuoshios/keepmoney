import { DocumentDefinition } from "mongoose";
import { CreateBudget } from "../interface/budget";
import { BudgetModel } from "../models/budget.models";

export const createBudget = async (data: DocumentDefinition<CreateBudget>) => {
    try {
        return BudgetModel.create(data);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};