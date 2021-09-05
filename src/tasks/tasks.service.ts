import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        // return this.tasks.find(task => task.id === id);
        const result = this.tasks.find(task => task.id === id);
        if (!result) throw new NotFoundException(`Task with id ${id} not found`);
        else return result;
    }

    getTasksByStatus(status?: TaskStatus): Task[] {
        return this.tasks.filter(task => task.status === status)
    }

    // getTasksFiltered(status: TaskStatus, search: string): Task[] {
    //     let tasks = this.getAllTasks();
    //     if (status) tasks = this.tasks.filter(task => task.status === status)
    //     if (search) tasks = this.tasks.filter(task => {
    //         if (task.title.includes(search) || task.description.includes(search)) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     })
    //     return tasks;
    // }
    getTasksFiltered(filtersDto: GetTasksFilterDTO): Task[] {
        const { status, search } = filtersDto;
        let tasks = this.getAllTasks();
        if (status) tasks = this.tasks.filter(task => task.status === status)
        if (search) tasks = this.tasks.filter(task => {
            if (task.title.includes(search) || task.description.includes(search)) {
                return true;
            } else {
                return false;
            }
        })
        return tasks;
    }

    // Service - Create task without DTO
    // createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.DONE
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
    
    // Service - Create task with DTO
    createTask(createTaskDto: CreateTaskDTO): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, createTaskDto: CreateTaskDTO): Task {
        const { title, description } = createTaskDto;
        return this.tasks.find(task => {
            if (task.id === id) {
                task.title = title,
                task.description = description
                return task;
            }
        })
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
    // updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);        
        task.status = status;
        return task
    }

    deleteTaskById(id: string): void {
        const result = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
