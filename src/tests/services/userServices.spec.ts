import UserService from '../../services/UserService';
import UserBuilder from '../testBuilders/UserBuilder';

import { UserInterface } from '../../interfaces/user';
import FakeUserRepository from '../repositories/fakes/UserRepository';

describe('User Service', () => {
    let userRepository: FakeUserRepository;
    let userService: UserService;

    beforeEach(() => {
        userRepository = new FakeUserRepository();
        userService = new UserService(<any>userRepository);
    });

    const makeSut = (userData?: Partial<UserInterface>): Promise<UserInterface> => {
        const userBuild = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .build();

        return userService.createUser(userBuild);
    };

    it('should be able to create a new User', async () => {
        const userBuild = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .build();

        const user = await userService.createUser(userBuild);

        expect(user.id).not.toBeUndefined();
    });

    it('should be able to login', async () => {
        const sut = await makeSut();

        const token = await userService.login(sut.email, sut.password);

        expect(token).toBeDefined();
        expect(token!.length).toBe(192);
    });

    it('should return a update User', async () => {
        const sut = await makeSut();

        const updates = {
            ...sut,
            name: 'Updated User',
        };

        const updatedUser = await userService.updateUser(sut.id, updates);

        expect(updatedUser!.id).toEqual(sut.id);
        expect(updatedUser!.name).toEqual('Updated User');
    });

    it('should be able to delete a User', async () => {
        const sut = await makeSut();

        await userService.deleteUser(sut.id);

        const userList = await userService.getAllUsers();
        expect(userList.find(user => user.id === sut.id)).toBeUndefined();
    });
});
