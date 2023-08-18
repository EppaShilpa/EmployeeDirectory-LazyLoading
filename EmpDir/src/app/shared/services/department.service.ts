import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  jsonServerBaseUrl: string = "http://localhost:3000/departments"
  Departments!: string[];
  private departmentSubject$ = new BehaviorSubject<string[]>(this.Departments);
  departments: Observable<string[]> = this.departmentSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getDepartments()
  }

  getDepartments(): void {
    this.httpClient.get(`${this.jsonServerBaseUrl}`).subscribe((data) => {
      this.Departments = data as string[];
      this.departmentSubject$.next(this.Departments)
    })
  }

  PostDepartment(department: string): void {
    let newDepartment={"id":this.Departments.length+1,"name":department,"count":0}
    this.httpClient.post(`${this.jsonServerBaseUrl}`, newDepartment).subscribe(data =>
      this.getDepartments()
    );
  }

  deleteDepartment(id: number) {
    console.log(`${this.jsonServerBaseUrl}/${id}`);
    this.httpClient.delete(`${this.jsonServerBaseUrl}/${id}`).subscribe(data =>
      this.getDepartments()
    )
  }

  updateDepartment(department: any) {
    this.httpClient.put(`${this.jsonServerBaseUrl}/${department.id}`, department).subscribe(data =>
      this.getDepartments()
    )
  }

}
