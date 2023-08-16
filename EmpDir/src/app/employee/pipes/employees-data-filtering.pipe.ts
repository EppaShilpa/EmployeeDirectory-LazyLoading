import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { selectedFilterType } from '../constants/selectedFilterEnum';

@Pipe({
  name: 'filterData'
})
@Injectable({
  providedIn: 'root'
})
export class EmployeesDataFilteringPipe implements PipeTransform {

  transform(employees: IEmployee[], filterType: string, filterValue: string, selectedFilter: string): IEmployee[] {
    if (selectedFilter === selectedFilterType.sideNavFilters) {
      return employees.filter((employee: IEmployee) => employee[filterType as keyof IEmployee] == filterValue);
    }
    else if (selectedFilter === selectedFilterType.alphabetSearch) {
      return employees.filter((employee: IEmployee) => (employee[filterType as keyof IEmployee] as string).startsWith(filterValue))
    }
    else if (selectedFilter === selectedFilterType.search) {
      return employees.filter((employee: IEmployee) => (employee[filterType as keyof IEmployee] as string).toLowerCase().includes(filterValue))
    }
    else {
      return employees;
    }

  }

}
