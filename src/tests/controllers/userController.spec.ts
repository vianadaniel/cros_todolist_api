import request from 'supertest';
import app from '../../app';
import UserService from '../../services/UserService';
import sinon from 'sinon';
import UserBuilder from '../testBuilders/UserBuilder';
import User from '../../database/entities/User';
import { container } from 'tsyringe';

describe('User routes', () => {
    let userServiceSpy: sinon.SinonStubbedInstance<UserService>;

    beforeEach(() => {
        sinon.restore();
        userServiceSpy = sinon.createStubInstance(UserService);
    });
    it('should create a new user', async () => {
        const user = new UserBuilder()
            .withName('Test User')
            .withEmail('test@example.com')
            .withPassword('password')
            .build();
        userServiceSpy.createUser.resolves(<User>user);
        sinon.stub(container, 'resolve').returns(userServiceSpy);
        const response = await request(app).post('/api/user').send(user);

        expect(response.status).toBe(201);
    });

    it('should login a user', async () => {
        const user = new UserBuilder()
            .withEmail('test@example.com')
            .withPassword('password')
            .build();
        userServiceSpy.login.resolves('token');
        sinon.stub(container, 'resolve').returns(userServiceSpy);
        const response = await request(app).post('/api/user/login').send({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(response.status).toBe(200);
        expect(response.body).toBe('token');
    });
});
