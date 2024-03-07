import { container } from 'tsyringe';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';


container.registerSingleton<IUserRepository>('UserRepository', UserRepository);


