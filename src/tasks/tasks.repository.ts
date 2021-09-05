import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-tasks.dto";
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
}