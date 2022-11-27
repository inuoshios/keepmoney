import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "../interface/transaction";

export const transactionSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["Expenses", "Credit"],
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Budget"
        }
    },
    {
        timestamps: true
    }
);

const TransactionModel = mongoose.model<ITransaction & Document>('Transaction', transactionSchema);

export {
    TransactionModel
};