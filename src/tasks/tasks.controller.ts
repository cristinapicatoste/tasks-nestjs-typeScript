import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { sample } from 'rxjs';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getTasks(
    //     @Query('status') status?: TaskStatus,
    //     @Query('search') search?: string
    //     ): Task[] {
    //         return this.tasksService.getTasksFiltered(status, search);
    // }
    @Get()
    getTasks(@Query() filtersDto: GetTasksFilterDTO): Task[] {
        if (Object.keys(filtersDto).length) {
            return this.tasksService.getTasksFiltered(filtersDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Get('/status')
    getTasksByStatus(@Query('searchStatus') searchStatus: TaskStatus): Task[] {
        return this.tasksService.getTasksByStatus(searchStatus);
    }

    // Controller - Create task without DTO
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    // ): Task {
    //     return this.tasksService.createTask(title, description)
    // }

    // Controller - Create task with DTO
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Put('/:id')
    updateTask(
        @Body() createTaskDto: CreateTaskDTO,
        @Param('id') id: string
    ): Task {
        return this.tasksService.updateTask(id, createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
        @Param('id') id: string,
    ): Task {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id)
    }


}
