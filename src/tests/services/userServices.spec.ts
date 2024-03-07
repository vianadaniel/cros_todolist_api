import { v4 as uuid } from 'uuid';

import UserService from '../../services/UserService';
import UserBuilder from '../testBuilders/UserBuilder';
import { makeUserService } from './makeInstance/user';
import { UserInterface } from '../../interfaces/user';

describe('User Service', () => {
    let userService: UserService;

    beforeAll(async () => {
        userService = makeUserService
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

    it('should be able to find a User by id', async () => {
        const sut = await makeSut();

        const userFinded = await userService.getUserById(sut.id);

        expect(userFinded!.id).toEqual(sut.id);
    });

    it('should return a User list', async () => {
        const sut = await makeSut();

        const userList = await userService.getAllUsers();

        expect(userList.find(user => user.id === sut.id)).toBeDefined();
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

        const deletedUser = await userService.deleteUser(sut.id);

        const userList = await userService.getAllUsers();
        expect(userList.find(user => user.id === sut.id)).toBeUndefined();
    });
});
