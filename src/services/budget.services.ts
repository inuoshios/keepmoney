import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { CreateBudget } from "../interface/budget";
import { BudgetModel } from "../models/budget.models";

export const createBudget = async (data: DocumentDefinition<Omit<CreateBudget, "transactions" | "_id">>) => {
    return BudgetModel.create(data);
};

export const findSingleBudget = async (query: FilterQuery<CreateBudget>) => {
    return BudgetModel.findOne(query);
};

export const getAllBudget = async (query: FilterQuery<CreateBudget>) => {
    return BudgetModel.find(query).populate('transactions');
};

export const updateBudget = async (
    query: FilterQuery<CreateBudget>,
    update: UpdateQuery<CreateBudget>,
    options: QueryOptions
) => {
    return BudgetModel.findOneAndUpdate(query, update, options)
};

export const deleteBudget = async (query: FilterQuery<CreateBudget>) => {
    return BudgetModel.findOneAndDelete(query);
};