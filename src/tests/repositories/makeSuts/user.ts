import { v4 as uuid } from 'uuid';
import { UserCreateInterface } from '../../../interfaces/user';
import User from '../../../database/entities/User';
import UserRepository from '../../../repositories/UserRepository';
import UserBuilder from '../../testBuilders/UserBuilder';

export default async function makeSutUser(
    userData?: Partial<UserCreateInterface>,
): Promise<User> {
    const userRepository = new UserRepository();

    const userBuild = new UserBuilder()
        .withName('John Doe')
        .withEmail('john.doe@example.com')
        .withPassword('password123')
        .withId(uuid())
        .build();

    return userRepository.createAndSave(Object.assign(userBuild, userData));
}
