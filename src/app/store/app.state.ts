import { Task } from "../modules/pages/components/tasks/tasks.model";

export interface AppState {
  tasksPage: {
    tasks: Task[]
  }
}
