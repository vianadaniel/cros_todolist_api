import { createConnection, getConnection, Connection } from 'typeorm';
import TaskRepository from '../../repositories/TaskRepository';
import { Task } from '../../database/entities/Task';
import User from '../../database/entities/User';
import { TaskInterface } from '../../interfaces/task';
import UserBuilder from '../testBuilders/UserBuilder';
import { v4 as uuid } from 'uuid';
import { UserInterface } from '../../interfaces/user';
import UserRepository from '../../repositories/UserRepository';

describe('TaskRepository', () => {
    let connection: Connection;

    let taskRepository: TaskRepository;
    let userRepository: UserRepository;

    let user = new UserBuilder()
        .withName('Test User')
        .withEmail('test@example.com')
        .withPassword('password')
        .withId(uuid())
        .build() as UserInterface;

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
        const taskData: TaskInterface = {
            title: 'Task 1',
            description: 'Description 1',
            status: 'pending',
        };

        const task = await taskRepository.createAndSave(taskData, user);

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
        expect(task.title).toBe('Task 1');
        expect(task.description).toBe('Description 1');
        expect(task.user).toBe(user);
        await taskRepository.delete(task.id);
    });

    it('should get all tasks by user id', async () => {
        const taskData1 = {
            title: 'Task 1',
            description: 'Description 1',
            status: 'pending',
        };
        const taskData2 = {
            title: 'Task 2',
            description: 'Description 2',
            status: 'pending',
        };
        const task1 = await taskRepository.createAndSave(taskData1, user);
        const task2 = await taskRepository.createAndSave(taskData2, user);

        const tasks = await taskRepository.getAllTaskByUserId(user.id);

        expect(tasks).toHaveLength(2);
        expect(tasks[0].id).toBe(task1.id);
        expect(tasks[1].id).toBe(task2.id);
    });

    it('should update a task', async () => {
        const taskData: TaskInterface = {
            title: 'Task 3',
            description: 'Description 3',
            status: 'pending',
        };
        const task = await taskRepository.createAndSave(taskData, user);

        const updatedTaskData: TaskInterface = {
            title: 'Updated Task',
            description: 'Updated Description',
            status: 'completed',
        };
        const updatedTask = await taskRepository.update(task.id, updatedTaskData);

        expect(updatedTask).toBeDefined();
        expect(updatedTask!.id).toBe(task.id);
        expect(updatedTask!.title).toBe('Updated Task');
        expect(updatedTask!.description).toBe('Updated Description');
    });

    it('should delete a task', async () => {
        const taskData: TaskInterface = {
            title: 'Task 4',
            description: 'Description 4',
            status: 'pending',
        };
        const task = await taskRepository.createAndSave(taskData, user);

        const result = await taskRepository.delete(task.id);

        expect(result).toBe(true);

        const deletedTask = await taskRepository.getById(task.id);

        expect(deletedTask).toBeUndefined();
    });

    it('should add a subtask to a task', async () => {
        const taskData: TaskInterface = {
            title: 'Task 5',
            description: 'Description 5',
            status: 'pending',
        };
        const task = await taskRepository.createAndSave(taskData, user);

        const subtaskData: TaskInterface = {
            title: 'Subtask 1',
            description: 'Subtask Description 1',
            status: 'pending',
        };
        const subtask = await taskRepository.addSubtask(task.id, subtaskData);

        expect(subtask).toBeDefined();
    });
});
