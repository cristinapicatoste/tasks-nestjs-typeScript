import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-tasks.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) query.andWhere('task.status = :status', { status: 'OPEN'})
        if (search) query.andWhere(
            'task.title ILIKE :search OR task.description ILIKE : search',
            { search: `%${search}%` }
        )
        const tasks = await query.getMany();
        return tasks
    }
}