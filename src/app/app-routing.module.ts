import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IssuesComponent } from './components/issues/issues.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'issues/:author/:repositoryName',
    component: IssuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
