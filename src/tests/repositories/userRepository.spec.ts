import { createConnection, getConnection, Connection } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';
import User from '../../database/entities/User';
import { Task } from '../../database/entities/Task';
import UserBuilder from '../testBuilders/UserBuilder';

let connection: Connection;
let userRepository: UserRepository;

beforeAll(async () => {
    try {
        connection = await createConnection({
            type: 'sqlite',
            database: ':memory:',
            entities: [User, Task],
            synchronize: true,
            logging: false,
        });

        userRepository = connection.getCustomRepository(UserRepository);
    } catch (error) {
        console.error('Error creating connection:', error);
    }
});

afterAll(async () => {
    if (connection) {
        await connection.close();
    }
});

describe('UserRepository', () => {
    test('createAndSave - SUCCESS', async () => {
        const user = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .build();

        const createdUser = await userRepository.createAndSave(user);

        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBeDefined();
        expect(createdUser.name).toBe(user.name);
        expect(createdUser.email).toBe(user.email);
    });

    test('getById - SUCCESS', async () => {
        const users = await userRepository.getAll();
        const user = users[0];

        const result = await userRepository.getById(user.id);

        expect(result).toEqual(user);
    });

    test('getByEmail - SUCCESS', async () => {
        const email = 'test@example.com';

        const result = await userRepository.getByEmail(email);

        expect(result?.email).toBe(email);
    });

    test('getAll - SUCCESS', async () => {
        const result = await userRepository.getAll();

        expect(result.length).toBe(1);
    });

    test('update - SUCCESS', async () => {
        const users = await userRepository.getAll();
        const user = users[0];

        const updatedData = { name: 'John Smith' };
        await userRepository.update(user.id, updatedData);

        const updatedUser = await userRepository.getById(user.id);

        expect(updatedUser?.name).toBe(updatedData.name);
    });

    test('delete - SUCCESS', async () => {
        const users = await userRepository.getAll();
        const user = users[0];

        await userRepository.delete(user.id);

        const deletedUser = await userRepository.getById(user.id);

        expect(deletedUser).toBeUndefined();
    });
});
