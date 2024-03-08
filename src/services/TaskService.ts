import { inject, injectable } from 'tsyringe';
import TaskRepository from '../repositories/TaskRepository';
import { TaskInterface } from '../interfaces/task';
import { Task } from '../database/entities/Task';

@injectable()
export default class TaskService {
    constructor(
        @inject('TaskRepository')
        private taskRepository: TaskRepository,
    ) {}

    public async createTask(taskData: TaskInterface): Promise<Task> {
        return this.taskRepository.createAndSave(taskData);
    }

    public async getTaskById(id: string): Promise<Task | undefined> {
        return this.taskRepository.getById(id);
    }

    public async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.getAll();
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
