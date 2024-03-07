import { Router } from 'express';
import * as UserController from '../controllers/userController';
import * as UserValidators from '../utils/user/validators';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */
router.post(
    '/',
    UserValidators.createUserValidator,
    validate,
    UserController.createUser,
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 */
router.get(
    '/:id',
    UserValidators.getUserByIdValidator,
    validate,
    UserController.getUserById,
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Users found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */
router.get(
    '/',
    UserController.getAllUsers,
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */
router.put(
    '/:id',
    UserValidators.updateUserValidator,
    validate,
    UserController.updateUser,
);

export default router;
