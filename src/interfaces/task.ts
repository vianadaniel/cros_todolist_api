export interface TaskCreateInterface {
    title: string;
    description?: string;
    status: string;
    userId: string;
}

export interface TaskUpdateInterface {
    title?: string;
    description?: string;
    status?: string;
}
