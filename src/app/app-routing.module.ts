import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimpleHttpComponent} from './simple-http/simple-http.component';

const routes: Routes = [
  { path: '', component: SimpleHttpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
