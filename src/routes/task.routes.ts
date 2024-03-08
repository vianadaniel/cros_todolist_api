import { Router } from 'express';
import * as TaskController from '../controllers/taskController';
import * as TaskValidators from '../utils/task/validator';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     description: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskCreate'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
router.post(
    '/',
    TaskValidators.createTaskValidator,
    validate,
    TaskController.createTask,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *       404:
 *         description: Task not found
 */
router.get(
    '/:id',
    TaskValidators.getTaskByIdValidator,
    validate,
    TaskController.getTaskById,
);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: Tasks found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 */
router.get('/', TaskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     description: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
router.put(
    '/:id',
    TaskValidators.updateTaskValidator,
    validate,
    TaskController.updateTask,
);

/**
 * @swagger
 * /api/tasks/{id}/subtasks:
 *   post:
 *     tags:
 *       - Tasks
 *     description: Add a subtask to a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskCreate'
 *     responses:
 *       201:
 *         description: Subtask added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
router.post(
    '/:id/subtasks',
    TaskValidators.addSubtaskValidator,
    validate,
    TaskController.addSubtask,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     description: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete(
    '/:id',
    TaskValidators.getTaskByIdValidator,
    validate,
    TaskController.deleteTask,
);

export default router;
