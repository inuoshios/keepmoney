import { z } from 'zod';

export const createTransactionSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "title cannot be empty"
        }),

        description: z.string().optional(),

        amount: z.number({
            required_error: "amount cannot be empty"
        }),

        type: z.enum(["Expenses", "Credit"]),

        owner: z.string().optional()
    }),
    query: z.object({}),

    params: z.object({
        budgetId: z.string({
            required_error: "budget it cannot be empty"
        })
    }),
});

export type CreateTransactionInput = z.TypeOf<typeof createTransactionSchema>;
