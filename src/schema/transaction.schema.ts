import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title cannot be empty',
    }),

    description: z.string().optional(),

    amount: z.number({
      required_error: 'amount cannot be empty',
    }),

    type: z.enum(['Expenses', 'Credit']),

    owner: z.string().optional(),
  }),
  query: z.object({}),

  params: z.object({
    budgetId: z.string({
      required_error: 'budget id cannot be empty',
    }),
  }),
});

export const getTransactionsSchema = z.object({
  params: z.object({
    budgetId: z.string({
      required_error: 'budget id cannot be empty',
    }),
  }),
});

export const getSingleTransactionSchema = z.object({
  params: z.object({
    budgetId: z.string({
      required_error: 'budget id cannot be empty',
    }),
    transactionId: z.string({
      required_error: 'transaction id cannot be empty',
    }),
  }),
});

export type CreateTransactionInput = z.TypeOf<typeof createTransactionSchema>;
export type getTransactionsParams = z.TypeOf<typeof getTransactionsSchema>;
export type getSingleTransactionParams = z.TypeOf<
  typeof getSingleTransactionSchema
>;
