import { inject, injectable } from 'tsyringe';
import TaskRepository from '../repositories/TaskRepository';
import { TaskInterface } from '../interfaces/task';
import { Task } from '../database/entities/Task';
import UserRepository from '../repositories/UserRepository';
import { HttpError } from '../utils/errors/HttpError';

@injectable()
export default class TaskService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: TaskRepository,
        @inject('UserRepository')
        private userRepository: UserRepository,
    ) {}

    public async createTask(taskData: TaskInterface): Promise<Task> {
        const user = await this.userRepository.getById(taskData.userId);

        if (!user) {
            throw new HttpError(404, 'User not found');
        }
        return this.taskRepository.createAndSave(taskData, user);
    }

    public async getTaskById(id: string): Promise<Task | undefined> {
        return this.taskRepository.getById(id);
    }

    public async getAllTaskByUserId(
        userId: string,
        status?: string,
    ): Promise<Task[]> {
        return this.taskRepository.getAllTaskByUserId(userId, status);
    }

    public async updateTask(
        id: string,
        taskData: TaskInterface,
    ): Promise<Task | undefined> {
        return this.taskRepository.update(id, taskData);
    }

    public async deleteTask(id: string): Promise<boolean> {
        return this.taskRepository.delete(id);
    }

    public async addSubtask(
        parentId: string,
        subtaskData: TaskInterface,
    ): Promise<Task | undefined> {
        return this.taskRepository.addSubtask(parentId, subtaskData);
    }
}
