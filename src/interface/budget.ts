export interface IBudget {
    _id: string;
    description: string;
    amount: number;
    month:
    | "January"
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
    userId: string;
    transactions: object;
}

export interface CreateBudget {
    _id: string;
    description?: string;
    amount: number;
    month:
    | "January"
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
    transactions?: string[];
}