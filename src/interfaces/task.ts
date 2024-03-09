import { UserInterface } from './user';

export interface TaskInterface {
    title: string;
    description?: string;
    status: string;
    parentTask?: TaskInterface;
    user?: UserInterface;
    subtasks?: TaskInterface[];
}
