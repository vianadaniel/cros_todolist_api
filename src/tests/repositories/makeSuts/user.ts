import { v4 as uuid } from 'uuid';
import { UserInterface } from '../../../interfaces/user';
import User from '../../../database/entities/User';
import UserRepository from '../../../repositories/UserRepository';
import UserBuilder from '../../testBuilders/UserBuilder';


export default async (userData?: Partial<UserInterface>): Promise<User> => {
    const userRepository = new UserRepository();

    const userBuild = new UserBuilder()
        .withName('John Doe')
        .withEmail('john.doe@example.com')
        .withPassword('password123')
        .build();

    return userRepository.createAndSave(Object.assign(userBuild, userData));
};