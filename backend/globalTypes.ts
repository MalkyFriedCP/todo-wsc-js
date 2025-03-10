export enum EAppState {
    PRODUCTION = 'production',
    DEV = 'dev',
}

export interface IUser { 
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface ICategory {
    id: string;
    name: string;
}

export interface ITodo {
    id: string;
    title: string;
    description: string;
    category: string
    isCompleted: boolean;
    userId: string;
}