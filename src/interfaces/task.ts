export interface TaskCreateInterface {
    title: string;
    description?: string;
    status: 'completed' | 'pending';
    userId: string;
}

export interface TaskUpdateInterface {
    title?: string;
    description?: string;
    status?: 'completed' | 'pending';
}

export interface TaskInterface {
    title: string;
    description?: string;
    status: 'completed' | 'pending';
    userId: string;
    id: string;
}
