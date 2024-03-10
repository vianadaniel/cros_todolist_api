import request from 'supertest';
import app from '../../app';

describe('GET /', () => {
    it('should return "Service 1.0.0"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Service 1.0.0');
    });
});
