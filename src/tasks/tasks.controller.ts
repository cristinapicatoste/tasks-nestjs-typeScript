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
    getTasks(@Query() filterDto: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
        @Param('id') id: string,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status)
    }
}
