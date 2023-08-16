import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { EmployeeDataService } from './services/employee-data.service';
import { EmployeeFiltersService } from './services/employee-filters.service';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[EmployeeDataService,EmployeeFiltersService],
  exports:[EmployeeFormComponent]
})
export class SharedModule { }
