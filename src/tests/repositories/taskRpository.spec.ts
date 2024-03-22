import { createConnection, Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import TaskRepository from '../../repositories/TaskRepository';
import { Task } from '../../database/entities/Task';
import User from '../../database/entities/User';
import { TaskCreateInterface } from '../../interfaces/task';
import UserBuilder from '../testBuilders/UserBuilder';

import UserRepository from '../../repositories/UserRepository';
import TaskBuilder from '../testBuilders/TaskBuilder';

describe('TaskRepository', () => {
    let connection: Connection;

    let taskRepository: TaskRepository;
    let userRepository: UserRepository;

    let user = new UserBuilder()
        .withName('Test User')
        .withEmail('test@example.com')
        .withPassword('password')
        .withId(uuid())
        .build() as User;

    beforeAll(async () => {
        try {
            connection = await createConnection({
                type: 'sqlite',
                database: ':memory:',
                entities: [User, Task],
                synchronize: true,
                logging: false,
            });

            taskRepository = connection.getCustomRepository(TaskRepository);
            userRepository = connection.getCustomRepository(UserRepository);
            user = await userRepository.createAndSave(user);
        } catch (error) {
            console.error('Error creating connection:', error);
        }
    });

    afterAll(async () => {
        if (connection) {
            await connection.close();
        }
    });

    it('should create and save a task', async () => {
        const taskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskRepository.createAndSave(taskData, user);

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
        expect(task.title).toBe('Task 1');
        expect(task.description).toBe('Description 1');
        expect(task.user).toBe(user);
        await taskRepository.delete(task.id);
    });

    it('should get all tasks by user id', async () => {
        const taskData1: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const taskData2: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 2')
            .withDescription('Description 2')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task1 = await taskRepository.createAndSave(taskData1, user);
        const task2 = await taskRepository.createAndSave(taskData2, user);

        const tasks = await taskRepository.getAllTaskByUserId(user.id);

        expect(tasks).toHaveLength(2);
        expect(tasks[0].id).toBe(task1.id);
        expect(tasks[1].id).toBe(task2.id);
    });

    it('should update a task', async () => {
        const taskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 3')
            .withDescription('Task Description 3')
            .withStatus('pending')
            .build();

        const task = await taskRepository.createAndSave(taskData, user);

        const updatedTaskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Updated Task')
            .withDescription('Updated Description')
            .withStatus('completed')
            .build();

        const updatedTask = await taskRepository.update(task.id, updatedTaskData);

        expect(updatedTask).toBeDefined();
        expect(updatedTask!.id).toBe(task.id);
        expect(updatedTask!.title).toBe('Updated Task');
        expect(updatedTask!.description).toBe('Updated Description');
    });

    it('should delete a task', async () => {
        const taskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 4')
            .withDescription('Description 4')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskRepository.createAndSave(taskData, user);

        const result = await taskRepository.delete(task.id);

        expect(result).toBe(true);

        const deletedTask = await taskRepository.getById(task.id);

        expect(deletedTask).toBeUndefined();
    });

    it('should add a subtask to a task', async () => {
        const taskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Task 5')
            .withDescription('Description 5')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskRepository.createAndSave(taskData, user);

        const subtaskData: TaskCreateInterface = new TaskBuilder()
            .withTitle('Subtask 1')
            .withDescription('Subtask Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const subtask = await taskRepository.addSubtask(task.id, subtaskData);

        expect(subtask).toBeDefined();
        expect(subtask!.id).toBeDefined();
        expect(subtask!.title).toBe('Subtask 1');
        expect(subtask!.description).toBe('Subtask Description 1');
        expect(subtask!.status).toBe('pending');
    });
});
