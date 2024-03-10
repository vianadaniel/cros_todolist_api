import User from '../../database/entities/User';
import { TaskInterface } from '../../interfaces/task';

export default class TaskBuilder {
    private task: TaskInterface;

    constructor() {
        this.task = {} as TaskInterface;
    }

    public withId(id: string): TaskBuilder {
        this.task.id = id;
        return this;
    }

    public withUserId(id: string): TaskBuilder {
        this.task.userId = id;
        return this;
    }

    public withTitle(title: string): TaskBuilder {
        this.task.title = title;
        return this;
    }

    public withDescription(description: string): TaskBuilder {
        this.task.description = description;
        return this;
    }

    public withStatus(status: 'completed' | 'pending'): TaskBuilder {
        this.task.status = status;
        return this;
    }

    public build(): TaskInterface {
        return this.task;
    }
}
