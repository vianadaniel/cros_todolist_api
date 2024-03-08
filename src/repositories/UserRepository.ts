/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserInterface } from '../interfaces/user';

export default class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }

    public async createAndSave(userData: UserInterface): Promise<User> {
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

    public async update(id: string, userData: UserInterface): Promise<User | undefined> {
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