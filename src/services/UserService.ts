import { inject, injectable } from 'tsyringe';
import  User  from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserInterface } from '../interfaces/user';

@injectable()
export default class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async createUser(userData: UserInterface): Promise<User> {
        return this.userRepository.createAndSave(userData);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return this.userRepository.getById(id);
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    public async updateUser(id: string, userData: UserInterface): Promise<User | undefined> {
        return this.userRepository.update(id, userData);
    }

    public async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }
}
