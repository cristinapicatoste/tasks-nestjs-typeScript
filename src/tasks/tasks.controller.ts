import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { sample } from 'rxjs';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get()
    getTasks(): Promise<Task> {
        return this.tasksService.getTasks();
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

}
