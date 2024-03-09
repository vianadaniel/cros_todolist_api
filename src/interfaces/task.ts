import { UserInterface } from './user';

export interface TaskInterface {
    title: string;
    description?: string;
    status: string;
    parentTask?: TaskInterface;
    userId: string;
    user?: UserInterface;
    subtasks?: TaskInterface[];
}
