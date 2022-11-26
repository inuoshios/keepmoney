import { DocumentDefinition, FilterQuery } from "mongoose";
import { CreateBudget } from "../interface/budget";
import { BudgetModel } from "../models/budget.models";

export const createBudget = async (data: DocumentDefinition<Omit<CreateBudget, "transactions" | "_id">>) => {
    return BudgetModel.create(data);
};

export const findSingleBudget = async (query: FilterQuery<CreateBudget>) => {
    return BudgetModel.findById(query);
};

export const getAllBudget = async (query: FilterQuery<CreateBudget>) => {
    return BudgetModel.find(query).populate('transactions');
};