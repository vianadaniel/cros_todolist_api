import { Router } from 'express';
import * as UserController from '../controllers/userController';
import * as UserValidators from '../utils/user/validators';
import { validate } from '../middlewares/validationMiddleware';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     description: Create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: JSON with user attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/UserCreate'
 *     responses:
 *       201:
 *         description: Successful
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
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', UserValidators.loginValidator, validate, UserController.login);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User
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
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     description: Get all user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags:
 *       - User
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
    verifyToken,
    UserValidators.updateUserValidator,
    validate,
    UserController.updateUser,
);

export default router;
