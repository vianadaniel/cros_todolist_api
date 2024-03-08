import { Request, Response, Router } from 'express';

import { swaggerSpec } from '../swagger';
import user from './user.routes';
import task from './task.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

router.use('/api/user', user);
router.use('/api/task', task);

export default router;
