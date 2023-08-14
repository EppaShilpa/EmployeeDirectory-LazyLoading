import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';
// import { MatDialog } from '@angular/material/dialog';
// import { IEmployee } from 'src/app/Models/iemployee';
// import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  
  @Input() employeeData!: IEmployee;
  id!: number

  constructor(private dialog: MatDialog) {

  }

  editEmployee() {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {

      data: {
        action: "DisplayAndEditEmployee",
        id: this.employeeData.id
      }
    })
    dialogRef.afterOpened().subscribe(() => {
      const blurOverlay = document.createElement('div');
      blurOverlay.classList.add('blur-overlay');
      document.body.appendChild(blurOverlay);
    });
    dialogRef.afterClosed().subscribe(() => {
      const blurOverlay = document.querySelector('.blur-overlay');
      if (blurOverlay) {
        document.body.removeChild(blurOverlay);
      }
    });
  }
}
