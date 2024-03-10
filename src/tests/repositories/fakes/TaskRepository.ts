import { v4 as uuid } from 'uuid';

import ITaskRepository from '../../../interfaces/repositories/ITaskRepository';
import { TaskCreateInterface, TaskInterface } from '../../../interfaces/task';
import { Task } from '../../../database/entities/Task';
import User from '../../../database/entities/User';
import TaskRepository from '../../../repositories/TaskRepository';

export default class FakeTaskRepository implements ITaskRepository {
    private tasks: Task[] = [];

    public async createAndSave(taskData: TaskInterface, user: User): Promise<Task> {
        const task = {
            ...taskData,
            id: uuid(),
            user: user,
            userId: user.id,
        } as unknown as Task;
        this.tasks.push(task);
        return task;
    }

    public async getById(id: string): Promise<Task | undefined> {
        return this.tasks.find(task => task.id === id);
    }

    public async getAllTaskByUserId(
        userId: string,
        status?: string,
    ): Promise<Task[]> {
        let tasks = this.tasks.filter(task => task.user.id === userId);
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        return tasks;
    }

    public async update(
        id: string,
        taskData: TaskInterface,
    ): Promise<Task | undefined> {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index >= 0) {
            const updatedTask = { ...this.tasks[index], ...taskData } as Task;
            this.tasks[index] = updatedTask;
            return updatedTask;
        }
        return undefined;
    }

    public async delete(id: string): Promise<boolean> {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }

    public async addSubtask(
        parentId: string,
        subtaskData: TaskCreateInterface,
    ): Promise<Task | undefined> {
        const task = this.tasks.find(task => task.id === parentId);
        if (task) {
            const subtask = {
                ...subtaskData,
                id: uuid(),
                parentTask: task.id,
            } as unknown as Task;
            this.tasks.push(subtask);
            return subtask as Task;
        }
        return undefined;
    }
}
