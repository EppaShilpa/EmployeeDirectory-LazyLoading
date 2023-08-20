import { LocalizedString } from '@angular/compiler';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IEmployee } from '../../Models/iemployee';
import { EmployeeDataService } from '../../services/employee-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { DepartmentService } from '../../services/department.service';
import { OfficeService } from '../../services/office.service';
import { JobTitleService } from '../../services/job-title.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent implements OnInit {

  employees!: IEmployee[];
  employeeId!: number;
  employee!: IEmployee;
  departmentsData!: Array<any>;
  officesData!: Array<any>;
  jobTitlesData!: Array<any>;
  editMode: boolean = false;
  isDisabled: boolean = false;
  mode!: string;
  id!: number;

  employeeForm: any = this.formBuilder.group(
    {
      id: 0,
      firstName: ['', [Validators.required, Validators.pattern("^([a-zA-Z]+)$")]],
      lastName: ['', [Validators.required, Validators.pattern("^([a-zA-Z]+)$")]],
      preferredName: ['', [Validators.required, Validators.pattern("^([a-z A-Z]+)$")]],
      department: ['', Validators.required],
      office: ['', Validators.required],
      jobTitle: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      skypeId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      imageUrl: ['', Validators.required]
    }
  )

  constructor(private route: ActivatedRoute, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public inputData: { id: number, action: string }, private ref: MatDialogRef<EmployeeFormComponent>, private formBuilder: FormBuilder, private employeeService: EmployeeDataService, private router: Router, private location: Location, private departmentService: DepartmentService, private officeService: OfficeService, private jobTitleService: JobTitleService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.route.url.subscribe(urlSegments => {
      const lastSegment = urlSegments[urlSegments.length - 1].path;
      if (lastSegment == "add") {
        this.mode = "Add Employee";
      }
      else {
        const lastSegment = urlSegments[urlSegments.length - 2].path;
        switch (lastSegment) {
          case "edit":
            this.editMode = true;
            this.mode = "Edit Employee";
            break;
          case "employee":
            this.mode = "Display Employee"
        }
      }
    });
    this.subscribeData();
  }

  subscribeData(): void {
    this.employeeService.employees$.subscribe((data: IEmployee[]) => {
      this.employees = data;
      if (this.mode == "Display Employee" || this.mode == "Edit Employee") {
        this.getEmployee();
      }
    })
    this.departmentService.departments.subscribe(data => {
      this.departmentsData = data
    }
    )
    this.jobTitleService.jobTitles.subscribe(data => {
      this.jobTitlesData = data
    })
    this.officeService.offices.subscribe(data => {
      this.officesData = data
    })
    console.log(this.mode);

  }
  getEmployee() {
    if (this.mode == "Display Employee") {
      const selectedEmployee = this.employees?.find((employee: { id: number; }) => employee.id === this.id);
      this.disableFormControls();
      this.employeeForm.setValue(selectedEmployee);
      if (selectedEmployee != undefined) {
        this.employee = selectedEmployee
      }

    }
    if (this.mode == "Edit Employee") {
      const selectedEmployee = this.employees.find((employee: { id: number; }) => employee.id === this.id);
      this.enableFormControls();
      this.employeeForm.setValue(selectedEmployee);
      if (selectedEmployee != undefined) {
        this.employee = selectedEmployee
      }
    }
  }

  onSubmit() {
    if (this.mode === "Add Employee") {
     this.incrementFiltersCount();
      var length=this.employees.length;
      this.employeeForm.value.id = this.employees[length-1].id+1;     
     this.employeeService.postEmployee(this.employeeForm.value)
    }
    else if (this.mode == "Edit Employee") {
      if (this.employee != undefined) {
        if (this.employee.department != this.employeeForm.value.department) {
          const previousDepartment = this.departmentsData.find(item => item.name === this.employee.department);
          const updatedDepartment = this.departmentsData.find(item => item.name === this.employeeForm.value.department);
          previousDepartment.count--;
          updatedDepartment.count++;
          this.departmentService.updateDepartment(previousDepartment)
          this.departmentService.updateDepartment(updatedDepartment)
        }
        if (this.employee.office != this.employeeForm.value.office) {
          const previousOffice = this.officesData.find(item => item.name === this.employee.office);
          const updatedOffice = this.officesData.find(item => item.name === this.employeeForm.value.office);
          previousOffice.count--;
          updatedOffice.count++;
          this.officeService.updateOffice(previousOffice)
          this.officeService.updateOffice(updatedOffice)
        }
        if (this.employee.jobTitle != this.employeeForm.value.jobTitle) {
          const previousjobTitle = this.jobTitlesData.find(item => item.name === this.employee.jobTitle);
          const updatedjobTitle = this.jobTitlesData.find(item => item.name === this.employeeForm.value.jobTitle);
          previousjobTitle.count--;
          updatedjobTitle.count++;
          this.jobTitleService.updateJobTitle(previousjobTitle)
          this.jobTitleService.updateJobTitle(updatedjobTitle)
        }
       
      }
      this.employeeService.updateEmployee(this.employeeForm.value)
    }
    this.router.navigate(['/employees']);
  }

  closeModal() {
    this.router.navigate(['/employees']);
  }

  uploadFile(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.employeeForm.value.imageUrl = event.target.result;
    }
  }

  deleteEmployee(): void {
    this.decrementFiltersCount();
    this.employeeService.deleteEmployee(this.employeeForm.value.id)
    this.router.navigate(['/employees']);
  }

  incrementFiltersCount(): void {

    const department = this.departmentsData.find(item => item.name === this.employeeForm.value.department);
    const office = this.officesData.find(item => item.name === this.employeeForm.value.office);
    const jobTitle = this.jobTitlesData.find(item => item.name === this.employeeForm.value.jobTitle);
    department.count++;
    office.count++;
    jobTitle.count++;
    this.departmentService.updateDepartment(department)
    this.officeService.updateOffice(office)
    this.jobTitleService.updateJobTitle(jobTitle)
  }
  decrementFiltersCount(): void {
    if (this.employee != undefined) {
      const department = this.departmentsData.find(item => item.name === this.employee.department);
      const office = this.officesData.find(item => item.name === this.employee.office);
      const jobTitle = this.jobTitlesData.find(item => item.name === this.employee.jobTitle);
      department.count--;
      office.count--;
      jobTitle.count--;
      this.departmentService.updateDepartment(department)
      this.officeService.updateOffice(office)
      this.jobTitleService.updateJobTitle(jobTitle)
    }
  }

  enableEdit(): void {
    this.mode = "Edit Employee"
    this.editMode = true;
    this.enableFormControls();
    this.isDisabled = false
  }

  enableFormControls(): void {
    for (const controlName in this.employeeForm.controls) {
      if (this.employeeForm.controls.hasOwnProperty(controlName)) {
        this.employeeForm.controls[controlName].enable();
      }
    }
  }

  disableFormControls(): void {
    for (const controlName in this.employeeForm.controls) {
      if (this.employeeForm.controls.hasOwnProperty(controlName)) {
        this.employeeForm.controls[controlName].disable();
      }
    }
  }

}
