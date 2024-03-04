import { Task } from "../modules/pages/components/tasks/tasks.model";
import * as TasksListActions from "./tasks.action";

export interface TasksState {
  tasks: Task[];
}

const initialState = {
  tasks: [
    new Task( 'Take the dog out for a walk' ),
    new Task( 'Go to the store for bread and milk' ),
    new Task( 'Learn all the subtleties of TypeScript programming' ),
    new Task( 'Master the Angular framework at a professional level' ),
  ]
};

export function tasksReducer(state: TasksState = initialState, action: TasksListActions.TasksListActions) {
  switch (action.type) {

    case TasksListActions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
    }

    case TasksListActions.DELETE_TASK:
      const oldTask = [...state.tasks];
      oldTask.splice(action.payload, 1);
      return {
          ...state,
          tasks: oldTask
      }

    case TasksListActions.SELECT_TASK:
      const index = action.payload;
      return {
          ...state,
      }

    case TasksListActions.UPDATE_TASK:
      const updatedTasks = [...state.tasks];
      updatedTasks[action.payload.index] = { ...action.payload };

      return {
          ...state,
          tasks: updatedTasks
      };

    default:
        return state

  }
}
