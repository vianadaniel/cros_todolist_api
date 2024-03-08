import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @ManyToOne(() => Task, task => task.subtasks, { nullable: true })
    parentTask: Task;

    @OneToMany(() => Task, task => task.parentTask)
    subtasks: Task[];
}
