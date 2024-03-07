import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from '../services/UserService';
import { UserInterface } from '../interfaces/user';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const userData = req.body;

    const userService = container.resolve(UserService);

    const user = await userService.createUser(userData);

    return res.status(201).json(user);
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const userService = container.resolve(UserService);

    const user = await userService.getUserById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const userService = container.resolve(UserService);

    const users = await userService.getAllUsers();

    return res.status(200).json(users);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userData: UserInterface = req.body;

    const userService = container.resolve(UserService);

    const user = await userService.updateUser(id, userData);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const userService = container.resolve(UserService);

    const success = await userService.deleteUser(id);

    if (!success) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).send();
};
