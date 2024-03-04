import { Component, OnInit } from '@angular/core';
import { Task, Tasks } from './tasks.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TasksListActions from "../../../../store/tasks.action";
import { AppState } from '../../../../store/app.state';

@Component({
  selector: 'app-todos',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  index: number = 0;
  upload: string = "";
  name: string = "";
  openUpdate: boolean = false;
  public tasksListState?: Observable<Tasks>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Loading a list of tasks from storage
    this.store.select('tasksPage').subscribe(({tasks}) => {
      this.tasks = tasks;
    })
  }

  //Adding a task to the task list
  addTask(task: string) {
    if(task) {
      this.store.dispatch(new TasksListActions.AddTask({name: task}))
    }
  }
  // Removing a task from the list
  deleteTasks(task:any) {
    if(!this.openUpdate) {
      this.store.dispatch(new TasksListActions.DeleteTask(task))
    }
  }
  // Selecting a task for later updated
  onSelectTask(task: Task, index: number): any {
    this.store.dispatch(new TasksListActions.SelectTask(index));
    this.index = index;
    this.upload = task.name;
    this.openUpdate = true;
  }
  // Saving a updated task
  saveUpdateTask(task: string): void {
    if(task) {
      this.store.dispatch(new TasksListActions.UpdateTask({ index: this.index, name: task }));
      this.openUpdate = false;
    }
  }
}
