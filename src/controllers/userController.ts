import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from '../services/UserService';
import { UserInterface } from '../interfaces/user';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userData = req.body;

        const userService = container.resolve(UserService);

        const existingUser = await userService.getByEmail(userData.email);
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'User with this email already exists' });
        }

        const user = await userService.createUser(userData);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;

        const userService = container.resolve(UserService);

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const userService = container.resolve(UserService);

        const users = await userService.getAllUsers();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const userData: UserInterface = req.body;

        const userService = container.resolve(UserService);

        const user = await userService.updateUser(id, userData);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const userService = container.resolve(UserService);

        const success = await userService.deleteUser(id);

        if (!success) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const userService = container.resolve(UserService);
        const token = await userService.login(email, password);
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
