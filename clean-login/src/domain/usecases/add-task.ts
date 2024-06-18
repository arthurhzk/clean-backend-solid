import { TaskModel } from '../models/add-task-model'

export interface AddTaskModel {
  title: string
  description: string
  userId: string
}

export interface AddTask {
  add(task: AddTaskModel): Promise<TaskModel>
}
