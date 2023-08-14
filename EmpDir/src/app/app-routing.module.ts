import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",redirectTo:"employees",pathMatch:"full"
  },  
  {
    path:"employees",loadChildren:()=>import('./employee/employee.module').then(mod=>mod.EmployeeModule)
  },
  {
    path:"employees/Add",loadChildren:()=>import('./shared/shared.module').then(mod=>mod.SharedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
