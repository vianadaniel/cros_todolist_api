import UserService from '../../../services/UserService';
import { FakeUserRepository } from '../../repositories/fakes/UserRepository';


const fakeUserRepository = new FakeUserRepository();

export const makeUserService = new UserService(fakeUserRepository);
