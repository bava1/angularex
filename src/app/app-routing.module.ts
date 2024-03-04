import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/core/components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full', title: 'Home' },
  {
    path: 'page',
    loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
