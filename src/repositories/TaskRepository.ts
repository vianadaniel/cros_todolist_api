/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import { Task } from '../database/entities/Task';
import { TaskInterface } from '../interfaces/task';
import ITaskRepository from '../interfaces/repositories/ITaskRepository';
import User from '../database/entities/User';
import { HttpError } from '../utils/errors/HttpError';

export default class TaskRepository implements ITaskRepository {
    private taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = getRepository(Task);
    }
    getAll(): Promise<Task[]> {
        throw new Error('Method not implemented.');
    }

    public async createAndSave(taskData: TaskInterface, user: User): Promise<Task> {
        const task = this.taskRepository.create(taskData);
        task.user = user;
        return this.taskRepository.save(task);
    }

    public async getById(id: string): Promise<Task | undefined> {
        return this.taskRepository.findOne(id);
    }

    public async getAllTaskByUserId(
        userId: string,
        status?: string,
    ): Promise<Task[]> {
        let query = this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.subtasks', 'subtask')
            .innerJoin('task.user', 'user', 'user.id = :userId', { userId });

        if (status) {
            query = query.where('task.status = :status', { status });
        }

        return query.getMany();
    }

    public async update(
        id: string,
        taskData: TaskInterface,
    ): Promise<Task | undefined> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            return undefined;
        }

        Object.assign(task, taskData);

        await this.taskRepository.save(task);

        return task;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.taskRepository.delete(id);

        return !!result.affected;
    }

    public async addSubtask(
        parentId: string,
        subtaskData: TaskInterface,
    ): Promise<Task | undefined> {
        const parentTask = await this.taskRepository.findOne(parentId);

        if (!parentTask) {
            return undefined;
        }

        const subtask = this.taskRepository.create({ ...subtaskData, parentTask });
        return this.taskRepository.save(subtask);
    }
}
