import { v4 as uuid } from 'uuid';
import { TaskInterface } from '../../../interfaces/task';

import TaskRepository from '../../../repositories/TaskRepository';
import TaskBuilder from '../../testBuilders/TaskBuilder';
import { Task } from '../../../database/entities/Task';
import UserRepository from '../../../repositories/UserRepository';
import UserBuilder from '../../testBuilders/UserBuilder';
import { UserCreateInterface } from '../../../interfaces/user';

export default async (
    taskData?: Partial<TaskInterface>,
    userData?: Partial<UserCreateInterface>,
): Promise<Task> => {
    const userRepository = new UserRepository();

    const userBuild = new UserBuilder()
        .withName('John Doe')
        .withEmail('john.doe@example.com')
        .withPassword('password123')
        .build();

    const user = await userRepository.createAndSave(
        Object.assign(userBuild, userData),
    );
    const taskRepository = new TaskRepository();

    const taskBuild = new TaskBuilder()
        .withTitle('Sample Task')
        .withDescription('Sample Task Description')
        .withStatus('pending')
        .build();

    return taskRepository.createAndSave(Object.assign(taskBuild, taskData), user);
};
