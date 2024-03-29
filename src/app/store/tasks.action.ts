import { Action } from "@ngrx/store";
import { Task } from "../modules/pages/components/tasks/tasks.model";

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SELECT_TASK = 'SELECT_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: Task) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: number) {}
}

export class SelectTask implements Action {
  readonly type = SELECT_TASK;
  constructor(public payload: number) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: { index: number; name: string }) {}
}

export type TasksListActions = AddTask | DeleteTask | SelectTask | UpdateTask;
