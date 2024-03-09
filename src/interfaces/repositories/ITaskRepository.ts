import { Task } from '../../database/entities/Task';
import User from '../../database/entities/User';
import { TaskCreateInterface, TaskUpdateInterface } from '../task';

export default interface ITaskRepository {
    createAndSave(taskData: TaskCreateInterface, user: User): Promise<Task>;
    getById(id: string): Promise<Task | undefined>;
    getAllTaskByUserId(userId: string): Promise<Task[]>;
    update(id: string, taskData: TaskUpdateInterface): Promise<Task | undefined>;
    delete(id: string): Promise<boolean>;
    addSubtask(
        parentId: string,
        subtaskData: TaskCreateInterface,
    ): Promise<Task | undefined>;
}
