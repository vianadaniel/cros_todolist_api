export interface TaskInterface {
    id: string;
    title: string;
    description?: string;
    status: string;
    parentTask?: TaskInterface;
    userId: string;
    subtasks?: TaskInterface[];
}
