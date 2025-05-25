import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// In-memory task storage (in production, you'd use a database)
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

let tasks: Task[] = [];
let nextId = 1;

export const addTaskTool = createTool({
  id: 'add-task',
  description: 'Add a new task to the task list',
  inputSchema: z.object({
    title: z.string().describe('Task title'),
    description: z.string().optional().describe('Task description'),
    priority: z.enum(['low', 'medium', 'high']).default('medium').describe('Task priority'),
  }),
  outputSchema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.string(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const task: Task = {
      id: nextId.toString(),
      title: context.title,
      description: context.description,
      completed: false,
      createdAt: new Date(),
      priority: context.priority,
    };
    
    tasks.push(task);
    nextId++;
    
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      message: `Task "${task.title}" added successfully with ID ${task.id}`,
    };
  },
});

export const listTasksTool = createTool({
  id: 'list-tasks',
  description: 'List all tasks or filter by completion status',
  inputSchema: z.object({
    status: z.enum(['all', 'pending', 'completed']).default('all').describe('Filter tasks by status'),
    priority: z.enum(['all', 'low', 'medium', 'high']).default('all').describe('Filter tasks by priority'),
  }),
  outputSchema: z.object({
    tasks: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      completed: z.boolean(),
      priority: z.string(),
      createdAt: z.string(),
      completedAt: z.string().optional(),
    })),
    count: z.number(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    let filteredTasks = tasks;
    
    // Filter by status
    if (context.status === 'pending') {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (context.status === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed);
    }
    
    // Filter by priority
    if (context.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === context.priority);
    }
    
    const taskList = filteredTasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt?.toISOString(),
    }));
    
    return {
      tasks: taskList,
      count: taskList.length,
      message: `Found ${taskList.length} task(s) matching the criteria`,
    };
  },
});

export const completeTaskTool = createTool({
  id: 'complete-task',
  description: 'Mark a task as completed',
  inputSchema: z.object({
    id: z.string().describe('Task ID to complete'),
  }),
  outputSchema: z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
    completedAt: z.string(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const task = tasks.find(t => t.id === context.id);
    
    if (!task) {
      throw new Error(`Task with ID ${context.id} not found`);
    }
    
    if (task.completed) {
      throw new Error(`Task "${task.title}" is already completed`);
    }
    
    task.completed = true;
    task.completedAt = new Date();
    
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      completedAt: task.completedAt.toISOString(),
      message: `Task "${task.title}" marked as completed`,
    };
  },
});

export const deleteTaskTool = createTool({
  id: 'delete-task',
  description: 'Delete a task from the task list',
  inputSchema: z.object({
    id: z.string().describe('Task ID to delete'),
  }),
  outputSchema: z.object({
    id: z.string(),
    title: z.string(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const taskIndex = tasks.findIndex(t => t.id === context.id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${context.id} not found`);
    }
    
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    
    return {
      id: deletedTask.id,
      title: deletedTask.title,
      message: `Task "${deletedTask.title}" deleted successfully`,
    };
  },
});

export const updateTaskTool = createTool({
  id: 'update-task',
  description: 'Update task title, description, or priority',
  inputSchema: z.object({
    id: z.string().describe('Task ID to update'),
    title: z.string().optional().describe('New task title'),
    description: z.string().optional().describe('New task description'),
    priority: z.enum(['low', 'medium', 'high']).optional().describe('New task priority'),
  }),
  outputSchema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.string(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const task = tasks.find(t => t.id === context.id);
    
    if (!task) {
      throw new Error(`Task with ID ${context.id} not found`);
    }
    
    if (context.title) task.title = context.title;
    if (context.description !== undefined) task.description = context.description;
    if (context.priority) task.priority = context.priority;
    
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      message: `Task "${task.title}" updated successfully`,
    };
  },
}); 