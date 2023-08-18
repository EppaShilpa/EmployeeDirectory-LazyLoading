import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeedirectoryComponent } from './components/employee-directory/employee-directory.component';
import { EmployeesDataFilteringPipe } from './pipes/employees-data-filtering.pipe';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FiltersModule } from '../filters/filters.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../shared/components/employee-form/employee-form.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SearchComponent,
    EmployeeCardComponent,
    EmployeedirectoryComponent,
    EmployeesDataFilteringPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    SharedModule,
    FiltersModule,
    MatDialogModule
  ],
  
  exports:[LayoutComponent]
})
export class EmployeeModule { }
