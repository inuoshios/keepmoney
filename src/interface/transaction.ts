export interface ITransaction {
    _id: string;
    title: string;
    description: string;
    amount: number;
    type: Type;

    owner: string;
}

export interface CreateTransaction {
    title: string;
    description?: string;
    amount: number;
    type: Type;
}

type Type = "Expenses" | "Credit";