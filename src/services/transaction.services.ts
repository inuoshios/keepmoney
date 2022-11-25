import { DocumentDefinition } from "mongoose";
import { CreateTransaction } from "../interface/transaction";
import { TransactionModel } from "../models/transaction.models";

export const createTransaction = async (data: DocumentDefinition<CreateTransaction>) => {
    try {
        return await TransactionModel.create(data);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};