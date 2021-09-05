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

    createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const taskFound = await this.tasksRepository.findOne(id);
        if (!taskFound) throw new NotFoundException(`Task with id ${id} not found`);
        return taskFound;
    }

    async deleteTaskById(id: string): Promise<void> {
        // Using delete()
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Task with ID ${id} not found`);
        // Using remove()
        // const result = await this.getTaskById(id);
        // return await this.tasksRepository.remove(result);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);        
        task.status = status;
        await this.tasksRepository.save(task);
        return task
    }

}
