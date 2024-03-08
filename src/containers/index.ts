import { container } from 'tsyringe';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import ITaskRepository from '../interfaces/repositories/ITaskRepository';
import TaskRepository from '../repositories/TaskRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
