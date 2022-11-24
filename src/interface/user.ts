export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    socialLinks?: string[];
    comparePassword(password: string): Promise<boolean | undefined>;
}

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    socialLinks?: string[];
}

export interface UserLogin {
    email: string;
    password: string;
}