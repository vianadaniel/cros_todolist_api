import { v4 as uuidv4 } from 'uuid';
import { createConnection, getConnection, Connection } from 'typeorm';
import User from '../../database/entities/User';
import UserRepository from '../../repositories/UserRepository';


let connection: Connection;
let userRepository: UserRepository;

beforeAll(async () => {
    connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [User],
        synchronize: true, // Set to false in production
    });

    userRepository = connection.getCustomRepository(UserRepository);
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    await connection.query('DELETE FROM users');
});

describe('UserRepository', () => {
    test('create - SUCCESS', async () => {
        const user = new User();
        user.id = uuidv4();
        user.name = 'John Doe';
        user.email = 'john.doe@example.com';
        user.password = 'password123';

        const createdUser = await userRepository.createAndSave(user);

        expect(createdUser).toEqual(user);
    });

    test('getById - OK', async () => {
        const userId = uuidv4();

        const user = new User();
        user.id = userId;
        user.name = 'Jane Doe';
        user.email = 'jane.doe@example.com';
        user.password = 'password456';

        await userRepository.createAndSave(user);

        const retrievedUser = await userRepository.getById(userId);

        expect(retrievedUser).toEqual(user);
    });

    // Adicione mais testes conforme necessário
});
