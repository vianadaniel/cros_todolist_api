import User from '../../database/entities/User';
import { UserInterface, UserUpdateInterface } from '../user';

export default interface IUserRepository {
    createAndSave(userData: UserInterface): Promise<User>;
    getById(id: string): Promise<User | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    getAll(): Promise<User[]>;
    update(id: string, userData: UserUpdateInterface): Promise<User | undefined>;
    delete(id: string): Promise<boolean>;
}
