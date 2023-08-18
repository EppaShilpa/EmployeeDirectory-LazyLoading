import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  
  departments!:any;
  department!:string;
  constructor(private departmentsService:DepartmentService) {
  this.departments=[];
  }

  ngOnInit(): void {
   this.subscribeData()
  }

  subscribeData():void{
    this.departmentsService.departments.subscribe(data => {
      this.departments = data;
    })
  }

  postDepartment(){
    if(this.department.length>0){  
      this.departmentsService.PostDepartment(this.department)
      this.department=''
    }
   
  }
  deleteDepartment(id:number){
    this.departmentsService.deleteDepartment(id);  
  }
}
