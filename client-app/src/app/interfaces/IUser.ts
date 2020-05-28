export interface IUser {
    user: string;
    displayName: string;
    tooken: string;
    image?: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}