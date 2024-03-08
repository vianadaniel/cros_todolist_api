import { Request, Response } from 'express';
import { container } from 'tsyringe';
import TaskService from '../services/TaskService';
import { TaskInterface } from '../interfaces/task';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskData: TaskInterface = req.body;
        const taskService = container.resolve(TaskService);
        const task = await taskService.createTask(taskData);
        res.status(201).json(task);
    } catch (error) {
        const err = error as { code: number; message: string };
        console.error('Error creating task:', error);
        res.status(err.code).json({ message: err.message });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskService = container.resolve(TaskService);
        const task = await taskService.getTaskById(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Error getting task by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskService = container.resolve(TaskService);
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error getting all tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskData: TaskInterface = req.body;
        const taskService = container.resolve(TaskService);
        const updatedTask = await taskService.updateTask(taskId, taskData);
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskService = container.resolve(TaskService);
        const result = await taskService.deleteTask(taskId);
        if (!result) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addSubtask = async (req: Request, res: Response): Promise<void> => {
    try {
        const parentId = req.params.id;
        const subtaskData: TaskInterface = req.body;
        const taskService = container.resolve(TaskService);
        const subtask = await taskService.addSubtask(parentId, subtaskData);
        if (!subtask) {
            res.status(404).json({ message: 'Parent task not found' });
            return;
        }
        res.status(201).json(subtask);
    } catch (error) {
        console.error('Error adding subtask:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
