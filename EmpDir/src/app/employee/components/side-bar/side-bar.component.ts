import { Component } from '@angular/core';
import { PipeModel } from 'src/app/shared/Models/PipeModel';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeDataService } from 'src/app/shared/services/employee-data.service';
import { EmployeeFiltersService } from 'src/app/shared/services/employee-filters.service';
import { EmployeesDataFilteringPipe } from '../../pipes/employees-data-filtering.pipe';
import { selectedFilterType } from '../../constants/selectedFilterEnum';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent {
  employees!: Array<IEmployee>;
  departmentMap = new Map()
  departments: Array<string> = [];
  officesMap = new Map()
  offices: Array<string> = [];
  jobTitlesMap = new Map()
  jobTitles: Array<string> = [];

  constructor(private employeeService: EmployeeDataService, private searchService: EmployeeFiltersService, private dataFilteringPipe: EmployeesDataFilteringPipe, private pipeModel: PipeModel) {
    this.employeeService.employees$.subscribe(data => {
      this.employees = data;
      this.GetSideNavFilters()
    })
  }

  getFilters(filterArray: Array<string>, filterMap: any, filter: string): void {
    this.employees?.map((element: IEmployee) => {
      if (filterMap.has(element[filter as keyof IEmployee])) {
        filterMap.set(element[filter as keyof IEmployee], filterMap.get(element[filter as keyof IEmployee]) + 1);
      }
      else {
        filterArray.push(element[filter as keyof IEmployee] as string);
        filterMap.set(element[filter as keyof IEmployee], 1);
      }
    })
  }

  GetSideNavFilters(): void {
    this.jobTitlesMap = new Map()
    this.departmentMap = new Map()
    this.officesMap = new Map()
    this.departments = [];
    this.offices = [];
    this.jobTitles = [];
    this.getFilters(this.departments, this.departmentMap, "department")
    this.getFilters(this.offices, this.officesMap, "office")
    this.getFilters(this.jobTitles, this.jobTitlesMap, "jobTitle")
  }

  getEmployeesBySideNavFilters(filterType: string, filterValue: string): void {
    this.pipeModel.employees = this.employees;
    this.pipeModel.filterType = filterType;
    this.pipeModel.filterValue = filterValue;
    this.pipeModel.selectedFilter = selectedFilterType.sideNavFilters;
    this.searchService.filterData(this.pipeModel)
  }
}
