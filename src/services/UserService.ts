import { inject, injectable } from 'tsyringe';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserCreateInterface, UserInterface } from '../interfaces/user';
import jwt from 'jsonwebtoken';

@injectable()
export default class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async createUser(userData: UserCreateInterface): Promise<User> {
        return this.userRepository.createAndSave(userData);
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.getByEmail(email);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return this.userRepository.getById(id);
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    public async updateUser(
        id: string,
        userData: UserInterface,
    ): Promise<User | undefined> {
        return this.userRepository.update(id, userData);
    }

    public async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }

    public async login(email: string, password: string): Promise<string | null> {
        try {
            const user = await this.userRepository.getByEmail(email);
            // if (!user || user.password !== password) {
            //     return null;
            // }
            if (!user) {
                return null;
            }

            const token = jwt.sign({ userId: user.id }, 'your_secret_key_here', {
                expiresIn: '1h',
            });

            return token;
        } catch (error) {
            console.error('Error while logging in:', error);
            return null;
        }
    }
}
