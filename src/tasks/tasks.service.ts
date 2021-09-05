import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    async getTasks(): Promise<Task> {
        return this.tasksRepository.findOneOrFail();
    }

    async getTaskById(id: string): Promise<Task> {
        const taskFound = await this.tasksRepository.findOne(id);
        if (!taskFound) throw new NotFoundException(`Task with id ${id} not found`);
        return taskFound;
    }

    createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

}
