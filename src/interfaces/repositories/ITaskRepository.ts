import { Task } from '../../database/entities/Task';
import { TaskInterface } from '../task';

export default interface ITaskRepository {
    createAndSave(taskData: TaskInterface): Promise<Task>;
    getById(id: string): Promise<Task | undefined>;
    getAll(): Promise<Task[]>;
    update(id: string, taskData: TaskInterface): Promise<Task | undefined>;
    delete(id: string): Promise<boolean>;
    addSubtask(
        parentId: string,
        subtaskData: TaskInterface,
    ): Promise<Task | undefined>;
}
