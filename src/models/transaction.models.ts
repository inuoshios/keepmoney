import mongoose, { Document } from "mongoose";
import { ITransaction } from "../interface/transaction";

export const transactionSchema = new mongoose.Schema(
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Budget",
            required: true
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