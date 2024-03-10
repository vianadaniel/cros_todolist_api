export interface UserInterface {
    id: string;
    name: string;
    password: string;
    email: string;
}

export interface UserCreateInterface {
    name: string;
    password: string;
    email: string;
}

export interface UserUpdateInterface {
    name?: string;
    password?: string;
    email?: string;
}
