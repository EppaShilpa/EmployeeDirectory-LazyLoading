import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { EmployeeFormComponent } from '../shared/components/employee-form/employee-form.component';

const routes: Routes = [
  {path:"",component:LayoutComponent},
  { path: 'add', component: EmployeeFormComponent},
  { path: 'employee/:id', component: EmployeeFormComponent},
  { path: 'employee/edit/:id', component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
