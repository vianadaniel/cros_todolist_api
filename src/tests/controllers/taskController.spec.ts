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
        const token = sign(
            { userId },
            process.env.JWT_SECRET || 'your_secret_key_here',
        );

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

    it('should get all tasks by userId', async () => {
        const userId = '80b06ca0-dc90-4753-ba28-6aede75ea11a';
        const token = sign(
            { userId },
            process.env.JWT_SECRET || 'your_secret_key_here',
        );

        const tasksData = [
            {
                userId,
                title: 'Minha nova task 1',
                description: 'Descrição da task 1',
                status: 'pending',
            },
            {
                userId,
                title: 'Minha nova task 2',
                description: 'Descrição da task 2',
                status: 'completed',
            },
        ];

        taskServiceSpy.getAllTaskByUserId.resolves(<any>tasksData);
        sinon.stub(container, 'resolve').returns(taskServiceSpy);

        const response = await request(app)
            .get(`/api/task/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(tasksData.length);
        expect(response.body[0].title).toBe(tasksData[0].title);
        expect(response.body[0].description).toBe(tasksData[0].description);
        expect(response.body[0].status).toBe(tasksData[0].status);
    });

    it('should delete a task', async () => {
        const userId = '80b06ca0-dc90-4753-ba28-6aede75ea11a';
        const taskId = '57ba8875-17ee-449a-be78-2b3192f8f65b';
        const token = sign({ userId }, 'your_secret_key_here');

        taskServiceSpy.deleteTask.resolves(true);

        sinon.stub(container, 'resolve').returns(taskServiceSpy);

        const response = await request(app)
            .delete(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(taskServiceSpy.deleteTask.calledOnceWith(taskId)).toBe(true);
    });

    it('should update a task', async () => {
        const userId = '80b06ca0-dc90-4753-ba28-6aede75ea11a';
        const taskId = '57ba8875-17ee-449a-be78-2b3192f8f65b';
        const token = sign(
            { userId },
            process.env.JWT_SECRET || 'your_secret_key_here',
        );

        const updatedTaskData = {
            title: 'Minha tarefa atualizada',
            description: 'Descrição atualizada da tarefa',
            status: 'completed',
        };

        taskServiceSpy.updateTask.resolves(<any>{
            ...updatedTaskData,
            userId,
            id: taskId,
        });

        sinon.stub(container, 'resolve').returns(taskServiceSpy);

        const response = await request(app)
            .put(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTaskData);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedTaskData.title);
        expect(response.body.description).toBe(updatedTaskData.description);
        expect(response.body.status).toBe(updatedTaskData.status);
        expect(
            taskServiceSpy.updateTask.calledOnceWith(taskId, <any>updatedTaskData),
        ).toBe(true);
    });
});
