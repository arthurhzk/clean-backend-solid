import { TaskModel } from '@/domain/models/add-task-model'
import { AddTaskModel } from '@/domain/usecases/add-task'
import { AddTaskRepository } from '../protocols/add-task-repository'

export class DbAddTask implements AddTaskRepository {
  constructor(private readonly addTaskRepository: AddTaskRepository) {}

  add(taskData: AddTaskModel): Promise<TaskModel> {
    return this.addTaskRepository.add(taskData)
  }
}
