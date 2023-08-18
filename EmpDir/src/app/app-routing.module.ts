import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './shared/components/employee-form/employee-form.component';

const routes: Routes = [
  {
    path: "", redirectTo: "employees", pathMatch: "full"
  },
  {
    path: "employees", loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule)
  },
  {
    path: 'departments', loadChildren: () => import('./departments/departments.module').then(mod => mod.DepartmentsModule)
  },
  {
    path: "jobTitles", loadChildren: () => import('./job-titles/job-titles.module').then(module => module.JobTitlesModule)
  },
  {
    path: "offices", loadChildren: () => import('./offices/offices.module').then(module => module.OfficesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
