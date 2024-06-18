import prisma from '@/infra/database'
import { AddTaskRepository } from '@/data/protocols/add-task-repository'
import { TaskModel } from '@/domain/models/add-task-model'
import { AddTaskModel } from '@/domain/usecases/add-task'

export class PrismaAddTaskRepository implements AddTaskRepository {
  async add(taskData: AddTaskModel): Promise<TaskModel> {
    return prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        userId: taskData.userId,
      },
    })
  }
}
