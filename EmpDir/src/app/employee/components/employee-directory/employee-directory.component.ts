import { Component } from '@angular/core';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeDataService } from 'src/app/shared/services/employee-data.service';
import { EmployeeFiltersService } from 'src/app/shared/services/employee-filters.service';


@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.scss']
})

export class EmployeedirectoryComponent {
  employees!: Array<IEmployee>;
  filterType!: string;
  filterValue!: string;
  selectedFilter!: string;

  constructor(private employeeService: EmployeeDataService, private employeeFilterService: EmployeeFiltersService) {
    this.employeeService.employees$.subscribe((data) => {
      this.employees = data;
    })
    this.employeeFilterService.data.subscribe(res => {
      this.employees = res.employees;
      this.filterType = res.filterType;
      this.filterValue = res.filterValue;
      this.selectedFilter = res.selectedFilter
    }
    )
  }

}
