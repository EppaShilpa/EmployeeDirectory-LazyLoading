import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeedirectoryComponent } from './components/employee-directory/employee-directory.component';
import { EmployeesDataFilteringPipe } from './pipes/employees-data-filtering.pipe';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SearchComponent,
    SidebarComponent,
    EmployeeCardComponent,
    EmployeedirectoryComponent,
    EmployeesDataFilteringPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports:[LayoutComponent]
})
export class EmployeeModule { }
