import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  
  @Input() employeeData!: IEmployee;
  id!: number

  constructor() {

  }

}
