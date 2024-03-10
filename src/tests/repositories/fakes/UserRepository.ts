import User from '../../../database/entities/User';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import { UserInterface } from '../../../interfaces/user';
import { v4 as uuid } from 'uuid';

export default class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async createAndSave(userData: UserInterface): Promise<User> {
        const user = { ...userData, id: uuid() } as User;
        this.users.push(user);

        return user;
    }

    public async getByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    public async getById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async getAll(): Promise<User[]> {
        return this.users;
    }

    public async update(
        id: string,
        userData: UserInterface,
    ): Promise<User | undefined> {
        const index = this.users.findIndex(user => user.id === id);
        if (index >= 0) {
            const updatedUser = { ...this.users[index], ...userData } as User;
            this.users[index] = updatedUser;
            return updatedUser;
        }
        return undefined;
    }

    public async delete(id: string): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;
    }
}
