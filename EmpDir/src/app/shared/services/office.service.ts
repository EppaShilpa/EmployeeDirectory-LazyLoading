import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  jsonServerBaseUrl: string = "http://localhost:3000/offices"
  Offices!: string[];
  private officeSubject$ = new BehaviorSubject<string[]>(this.Offices);
  offices: Observable<string[]> = this.officeSubject$.asObservable();
  
  constructor(private httpClient: HttpClient) {
    this.getOffices()
  }

  getOffices(): void {
    this.httpClient.get(`${this.jsonServerBaseUrl}`).subscribe((data) => {
      this.Offices = data as string[];
      this.officeSubject$.next(this.Offices)
    })
  }
  
  PostOffice(office:string):void{
    let newOffice={"id":this.Offices.length+1,"name":office,"count":0}
    this.httpClient.post(`${this.jsonServerBaseUrl}`, newOffice).subscribe(data =>
      this.getOffices()
    );
  }

  deleteOffice(id: number) {
    console.log(`${this.jsonServerBaseUrl}/${id}`);
    this.httpClient.delete(`${this.jsonServerBaseUrl}/${id}`).subscribe(data =>
      this.getOffices()
    )
  }

  updateOffice(office: any) {
    this.httpClient.put(`${this.jsonServerBaseUrl}/${office.id}`, office).subscribe(data =>
      this.getOffices()
    )
  }
}
