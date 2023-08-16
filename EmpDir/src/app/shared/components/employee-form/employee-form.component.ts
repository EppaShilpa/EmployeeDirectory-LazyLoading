import { LocalizedString } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployee } from '../../Models/iemployee';
import { EmployeeDataService } from '../../services/employee-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})

export class EmployeeFormComponent {

  employees!: IEmployee[];
  employeeId!:number;
  departmentOptions!: string[];
  OfficeOptions!: string[];
  JobTitleOptions!: string[];
  editMode: boolean = false;
  isDisabled: boolean = false;

  employeeForm: any = this.formBuilder.group(
    {
      id: 0,
      firstName: ['', [Validators.required, Validators.pattern("^([a-zA-Z]+)$")]],
      lastName: ['', [Validators.required, Validators.pattern("^([a-zA-Z]+)$")]],
      preferredName: ['', [Validators.required, Validators.pattern("^([a-z A-Z]+)$")]],
      department: ['', [Validators.required, Validators.pattern("^([a-z A-Z]+)$")]],
      office: ['', [Validators.required, Validators.pattern("^([a-z A-Z]+)$")]],
      jobTitle: ['', [Validators.required, Validators.pattern("^([. a-z A-Z]+)$")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      skypeId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      imageUrl: ['', Validators.required]
    }
  )

  constructor(@Inject(MAT_DIALOG_DATA) public inputData: { id: number, action: string }, private ref: MatDialogRef<EmployeeFormComponent>, private formBuilder: FormBuilder, private employeeService: EmployeeDataService,   private router: Router,) {
    employeeService.employees$.subscribe((data: IEmployee[]) => {
      this.employees = data;
    })
    if (inputData.action === "DisplayAndEditEmployee") {
      this.isDisabled = true;
      const selectedEmployee = this.employees.find((employee: { id: number; }) => employee.id === inputData.id);
      this.employeeId=selectedEmployee?.id==undefined?-1:selectedEmployee.id;
      this.disableFormControls();
      this.employeeForm.setValue(selectedEmployee);
    }
  }

  onSubmit() {
    if (this.inputData.action === "AddEmployee") {
      this.employeeForm.value.id = this.employees.length;
      this.employeeService.postEmployee(this.employeeForm.value)
    }
    else if (this.inputData.action === "DisplayAndEditEmployee") {
      this.employeeService.updateEmployee(this.employeeForm.value)
    }
    this.ref.close();
    this.router.navigate(['/employees']); 
  }

  closeModal() {
    this.ref.close();
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
    console.log(this.employeeForm.value.id);
    this.employeeService.deleteEmployee(this.employeeForm.value.id)
    this.closeModal();
    this.router.navigate(['/employees']); 
  }

  enableEdit(): void {
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
