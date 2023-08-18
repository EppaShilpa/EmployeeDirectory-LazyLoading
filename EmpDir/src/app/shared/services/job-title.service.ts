import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  jsonServerBaseUrl: string = "http://localhost:3000/jobTitles"
  JobTitles!: string[];

  private jobTitleSubject$ = new BehaviorSubject<string[]>(this.JobTitles);
  jobTitles: Observable<string[]> = this.jobTitleSubject$.asObservable();
  
  constructor(private httpClient: HttpClient) {
    this.getJobTitles()
  }

  getJobTitles(): void {
    this.httpClient.get(`${this.jsonServerBaseUrl}`).subscribe((data) => {
      this.JobTitles = data as string[];
      this.jobTitleSubject$.next(this.JobTitles)
    })
  }

  PostJobTitle(jobTitle:string):void{
    let newDepartment={"id":this.JobTitles.length+1,"name":jobTitle,"count":0}
    this.httpClient.post(`${this.jsonServerBaseUrl}`, newDepartment).subscribe(data =>
      this.getJobTitles()
    );
  }

  deleteJobTitle(id: number) {
    console.log(`${this.jsonServerBaseUrl}/${id}`);
    this.httpClient.delete(`${this.jsonServerBaseUrl}/${id}`).subscribe(data =>
      this.getJobTitles()
    )
  }
  updateJobTitle(office: any) {
    this.httpClient.put(`${this.jsonServerBaseUrl}/${office.id}`, office).subscribe(data =>
      this.getJobTitles()
    )
  }
}
