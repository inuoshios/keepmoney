import { DocumentDefinition } from "mongoose";
import { CreateTransaction } from "../interface/transaction";
import { TransactionModel } from "../models/transaction.models";

export const createTransaction = async (data: DocumentDefinition<CreateTransaction>) => {
    return TransactionModel.create(data);
};