import { DocumentDefinition, FilterQuery } from "mongoose";
import { CreateBudget } from "../interface/budget";
import { BudgetModel } from "../models/budget.models";

export const createBudget = async (data: DocumentDefinition<Omit<CreateBudget, "transactions" | "_id">>) => {
    try {
        return BudgetModel.create(data);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export const findSingleBudget = async (query: FilterQuery<CreateBudget>) => {
    return await BudgetModel.findOne(query);
};