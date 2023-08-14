import { Component } from '@angular/core';
import { Alphabets } from '../../constants/alphabets';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeFiltersService } from 'src/app/shared/services/employee-filters.service';
import { EmployeeDataService } from 'src/app/shared/services/employee-data.service';
import { EmployeesDataFilteringPipe } from '../../pipes/employees-data-filtering.pipe';
import { PipeModel } from 'src/app/shared/Models/PipeModel';
import { selectedFilterType } from '../../constants/selectedFilterEnum';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';

// import { EmployeeDataService } from 'src/app/services/employee-data.service';
// import { EmployeeFiltersService } from 'src/app/services/employee-filters.service';
// import { Alphabets } from 'src/app/constants/alphabets';
// import { IEmployee } from 'src/app/Models/iemployee';
// import { MatDialog } from '@angular/material/dialog';
// import { EmployeeFormComponent } from '../employee-form/employee-form.component';
// import { EmployeesDataFilteringPipe } from 'src/app/pipes/employees-data-filtering.pipe';
// import { selectedFilterType } from 'src/app/constants/selectedFilterEnum'
// import { PipeModel } from 'src/app/Models/PipeModel';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  alphabetsArray: Array<string> = Alphabets;
  searchText!: string;
  employees!: IEmployee[];
  filteredData: IEmployee[] = [];
  selectedFilter: string = "preferredName";
 

  constructor(private searchService: EmployeeFiltersService, private employeeService: EmployeeDataService, private dialog: MatDialog, private dataFilteringPipe: EmployeesDataFilteringPipe, private pipeModel: PipeModel) {
    employeeService.employees$.subscribe(data => {
      this.employees = data;
    })
  }

  onAlphabetClick(alphabet: string) {
    this.pipeModel.employees = this.employees;
    this.pipeModel.filterType = this.selectedFilter;
    this.pipeModel.filterValue = alphabet;
    this.pipeModel.selectedFilter = selectedFilterType.alphabetSearch;
    this.searchService.filterData(this.pipeModel)
  }

  handleSearch(): void {
    console.log(this.searchText);
    console.log(this.selectedFilter)
    this.pipeModel.employees = this.employees;
    this.pipeModel.filterType = this.selectedFilter;
    this.pipeModel.filterValue = this.searchText.toLowerCase();
    this.pipeModel.selectedFilter = selectedFilterType.search;
    this.searchService.filterData(this.pipeModel)
    console.log(this.pipeModel);
    
  }

  viewAllEmployees(): void {
    this.pipeModel.employees = this.employees;
    this.pipeModel.filterType = "";
    this.pipeModel.filterValue = "";
    this.pipeModel.selectedFilter = "";
    this.searchService.filterData(this.pipeModel)
  }

  clearAllFilters(): void {
    this.pipeModel.employees = this.employees;
    this.pipeModel.filterType = "";
    this.pipeModel.filterValue = "";
    this.pipeModel.selectedFilter = "";
    this.searchText="";
    this.searchService.filterData(this.pipeModel)
  }

  openModal() {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: {
        action: "AddEmployee"
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
