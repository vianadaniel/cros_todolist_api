/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserCreateInterface, UserUpdateInterface } from '../interfaces/user';

@EntityRepository(User)
export default class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async createAndSave(userData: UserCreateInterface): Promise<User> {
        const user = this.userRepository.create(userData);

        return this.userRepository.save(user);
    }

    public async getById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    public async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async update(
        id: string,
        userData: UserUpdateInterface,
    ): Promise<User | undefined> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            return undefined;
        }

        Object.assign(user, userData);

        await this.userRepository.save(user);

        return user;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.userRepository.delete(id);

        return !!result.affected;
    }
}
