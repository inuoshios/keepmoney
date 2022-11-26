import { DocumentDefinition, FilterQuery } from "mongoose";
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