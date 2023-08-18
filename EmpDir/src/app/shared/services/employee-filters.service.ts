import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PipeModel } from '../Models/PipeModel';

@Injectable({
  providedIn: 'root'
})

export class EmployeeFiltersService {

  private dataSubject = new Subject<PipeModel>();
  data: Observable<PipeModel> = this.dataSubject.asObservable();

  filterData(filterPipe: PipeModel) {
    this.dataSubject.next(filterPipe)
  }
}