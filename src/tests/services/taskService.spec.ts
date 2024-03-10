import TaskService from '../../services/TaskService';

import { v4 as uuid } from 'uuid';

import TaskBuilder from '../testBuilders/TaskBuilder';
import UserBuilder from '../testBuilders/UserBuilder';
import UserService from '../../services/UserService';
import FakeUserRepository from '../repositories/fakes/UserRepository';
import FakeTaskRepository from '../repositories/fakes/TaskRepository';
import User from '../../database/entities/User';

describe('Task Service', () => {
    let taskService: TaskService;
    let taskRepository: FakeTaskRepository;
    let userRepository: FakeUserRepository;
    let userService: UserService;
    let user: User;

    beforeEach(async () => {
        taskRepository = new FakeTaskRepository();
        userRepository = new FakeUserRepository();
        taskService = new TaskService(<any>taskRepository, <any>userRepository);
        userService = new UserService(<any>userRepository);

        const userBuild = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .withId(uuid())
            .build();

        user = await userService.createUser(userBuild);
    });

    it('should be able to create a new task', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskService.createTask(taskData);

        expect(task.title).toBe(taskData.title);
        expect(task.id).not.toBeUndefined();
    });

    it('should be able to get task by userId', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        await taskService.createTask(taskData);
        await taskService.createTask(taskData);

        const tasks = await taskService.getAllTaskByUserId(user.id);

        expect(tasks[0].id).not.toBeUndefined();
        expect(tasks.length).toBe(2);
    });

    it('should be able to edit task by id', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskService.createTask(taskData);

        const taskUpdate = await taskService.updateTask(task.id, {
            title: 'Updated Task',
            description: 'Updated Description',
            status: 'completed',
        });

        expect(taskUpdate!.title).toBe('Updated Task');
    });

    it('should be able to delete task by id', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        await taskService.createTask(taskData);

        const task = await taskService.deleteTask(taskData.id);

        expect(task).toBe(false);
    });

    it('should be able to delete task by id', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        await taskService.createTask(taskData);
        await taskService.createTask({ ...taskData, status: 'completed' });

        const tasks = await taskService.getAllTaskByUserId(user.id, 'completed');

        expect(tasks[0].status).toBe('completed');
    });

    it('should be able to create a sub task by id', async () => {
        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .withId(uuid())
            .build();

        const task = await taskService.createTask(taskData);
        const subTask = await taskService.addSubtask(task.id, {
            ...taskData,
            title: 'subtask 1',
        });

        expect(subTask?.title).toBe('subtask 1');
    });
});
