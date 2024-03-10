import request from 'supertest';
import app from '../../app';
import TaskService from '../../services/TaskService';
import sinon from 'sinon';

import { container } from 'tsyringe';

import { sign } from 'jsonwebtoken';

describe('task routes', () => {
    let taskServiceSpy: sinon.SinonStubbedInstance<TaskService>;

    beforeEach(() => {
        sinon.restore();
        taskServiceSpy = sinon.createStubInstance(TaskService);
    });
    it('should create a new task', async () => {
        const userId = '80b06ca0-dc90-4753-ba28-6aede75ea11a';
        const token = sign({ userId }, 'your_secret_key_here');

        const taskData = {
            userId,
            title: 'Minha nova task',
            description: 'Descrição da task',
            status: 'pending',
        };

        taskServiceSpy.createTask.resolves(<any>taskData);
        sinon.stub(container, 'resolve').returns(taskServiceSpy);

        const response = await request(app)
            .post('/api/task')
            .set('Authorization', `Bearer ${token}`)
            .send(taskData);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(taskData.title);
        expect(response.body.description).toBe(taskData.description);
        expect(response.body.status).toBe(taskData.status);
    });
});
