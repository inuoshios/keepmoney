import mongoose, { Schema, Document } from 'mongoose';
import { IBudget } from '../interface/budget';
import { transactionSchema } from './transaction.models';

const budgetSchema = new mongoose.Schema(
    {
        description: {
            type: String
        },
        amount: {
            type: Number,
            required: true
        },
        month: {
            type: String,
            enum: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        transactions: [{
            type: transactionSchema
        }]

    },
    {
        timestamps: true
    }
);

const BudgetModel = mongoose.model<IBudget & Document>('Budget', budgetSchema);

export { BudgetModel };