import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: PagesComponent, children: [
    { path: 'tasks', component: TasksComponent, title: 'Tasks' },
    { path: 'articles', component: ArticlesComponent, title: 'Articles' },
    { path: 'contacts', component: ContactsComponent, title: 'Contacts' },
  ] },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
