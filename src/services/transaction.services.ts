import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery
} from "mongoose";
import { CreateTransaction } from "../interface/transaction";
import { TransactionModel } from "../models/transaction.models";

export const createTransaction = async (data: DocumentDefinition<CreateTransaction>) => {
    return TransactionModel.create(data);
};

export const getTransactions = async (query: FilterQuery<CreateTransaction>) => {
    return TransactionModel.find(query);
};

export const getSingleTransaction = async (query: FilterQuery<CreateTransaction>) => {
    return TransactionModel.findOne(query);
};

export const updateSingleTransaction = async (
    query: FilterQuery<CreateTransaction>,
    update: UpdateQuery<CreateTransaction>,
    options: QueryOptions<CreateTransaction>
) => {
    return TransactionModel.findOneAndUpdate(query, update, options);
};

export const deleteSingleTransaction = async (query: FilterQuery<CreateTransaction>) => {
    return TransactionModel.findOneAndDelete(query);
};