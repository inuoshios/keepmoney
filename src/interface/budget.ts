export interface IBudget {
    _id: string;
    description: string;
    amount: number;
    month: Month;
    userId: string;
    transactions: object[];
}

export interface CreateBudget {
    _id: string;
    description?: string;
    amount: number;
    month: Month;

    transactions?: object[];
}

type Month = "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";