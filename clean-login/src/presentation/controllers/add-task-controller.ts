import { HttpRequest, HttpResponse } from '../protocols/http'
import { created } from '@/presentation/helpers/http-helper'
import { PrismaAddTaskRepository } from '@/infra/database/repositories/prisma-add-task'

export class AddTaskController {
  constructor(private readonly addTaskRepository: PrismaAddTaskRepository) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = global.decoded.id
    const task = await this.addTaskRepository.add({
      title: httpRequest.body.title,
      description: httpRequest.body.description,
      userId: userId,
    })
    return created(task)
  }
}

export const makeAddTaskController = (): AddTaskController => {
  const prismaAddTaskRepository = new PrismaAddTaskRepository()
  return new AddTaskController(prismaAddTaskRepository)
}
