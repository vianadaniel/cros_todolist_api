import TaskService from '../../services/TaskService';

import { v4 as uuid } from 'uuid';

import TaskBuilder from '../testBuilders/TaskBuilder';
import UserBuilder from '../testBuilders/UserBuilder';
import UserService from '../../services/UserService';
import FakeUserRepository from '../repositories/fakes/UserRepository';
import FakeTaskRepository from '../repositories/fakes/TaskRepository';

describe('Task Service', () => {
    let taskService: TaskService;
    let taskRepository: FakeTaskRepository;
    let userRepository: FakeUserRepository;
    let userService: UserService;

    beforeEach(() => {
        taskRepository = new FakeTaskRepository();
        userRepository = new FakeUserRepository();
        taskService = new TaskService(<any>taskRepository, <any>userRepository);
        userService = new UserService(<any>userRepository);
    });

    it('should be able to create a new task', async () => {
        const userBuild = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .withId(uuid())
            .build();

        const user = await userService.createUser(userBuild);

        const taskData = new TaskBuilder()
            .withTitle('Task 1')
            .withDescription('Description 1')
            .withStatus('pending')
            .withUserId(user.id)
            .build();

        const task = await taskService.createTask(taskData);

        expect(task.id).not.toBeUndefined();
    });
});
