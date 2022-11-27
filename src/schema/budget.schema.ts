import { z } from 'zod';

export const createBudgetSchema = z.object({
    body: z.object({
        description: z.string().optional(),
        amount: z.number({
            required_error: "amount cannot be empty"
        }),

        month: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]),

        userId: z.string().optional(),

    })
});

export const getSingleBudgetSchema = z.object({
    params: z.object({
        budgetId: z.string({
            required_error: "budge"
        })
    })
});

export const deleteBudgetSchema = z.object({
    params: z.object({
        budgetId: z.string({
            required_error: "budge"
        })
    })
});

export const updateBudgetSchema = z.object({
    body: z.object({
        description: z.string().optional(),
        amount: z.number().optional(),

        month: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]),

        userId: z.string().optional(),

    }),
    params: z.object({
        budgetId: z.string({
            required_error: "budgetId is required"
        })
    })
});

export type createBudgetInput = z.TypeOf<typeof createBudgetSchema>;
export type getSingleBudgetParams = z.TypeOf<typeof getSingleBudgetSchema>;
export type updateBudgetParams = z.TypeOf<typeof updateBudgetSchema>;
export type deleteBudgetParams = z.TypeOf<typeof deleteBudgetSchema>;