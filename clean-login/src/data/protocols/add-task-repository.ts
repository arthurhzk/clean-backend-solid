import { TaskModel } from '@/domain/models/add-task-model'
import { AddTaskModel } from '@/domain/usecases/add-task'

export interface AddTaskRepository {
  add(taskData: AddTaskModel): Promise<TaskModel>
}
