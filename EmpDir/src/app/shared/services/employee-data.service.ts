import { Injectable } from '@angular/core';
import { IEmployee } from '../Models/iemployee';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmployeeDataService {

  employees!: IEmployee[];
  jsonServerBaseUrl: string = "http://localhost:3000/employees"

  private employeeSubject = new BehaviorSubject<IEmployee[]>(this.employees);
  employees$: Observable<IEmployee[]> = this.employeeSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getEmployees();
  }

  getEmployees() {
    this.httpClient.get(`${this.jsonServerBaseUrl}`).subscribe((data) => {
      this.employees = data as IEmployee[];
      this.employeeSubject.next(this.employees)
    })
  }

  postEmployee(employee: IEmployee) {
    this.httpClient.post(`${this.jsonServerBaseUrl}`, employee).subscribe(data =>
      this.getEmployees()
    );
  }

  deleteEmployee(id: number) {
    console.log(`${this.jsonServerBaseUrl}/${id}`);
    this.httpClient.delete(`${this.jsonServerBaseUrl}/${id}`).subscribe(data =>
      this.getEmployees()
    )
  }

  updateEmployee(employee: IEmployee) {
    this.httpClient.put(`${this.jsonServerBaseUrl}/${employee.id}`, employee).subscribe(data =>
      this.getEmployees()
    )
  }

}
