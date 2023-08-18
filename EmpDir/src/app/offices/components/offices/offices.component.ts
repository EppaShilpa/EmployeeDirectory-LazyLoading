import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { OfficeService } from 'src/app/shared/services/office.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {
  employees: Array<IEmployee> = [];
  offices!:any;
  office!: string;
  constructor(private officeService: OfficeService) {
  }

  ngOnInit(): void {
    this.subscribeData()
  }

  subscribeData(): void {
    this.officeService.offices.subscribe(data => {
      this.offices = data;
    })
  }

  postOffice() {
    if (this.office.length > 0) {
      this.officeService.PostOffice(this.office)
      this.office=''
    }
  }
  deleteOffice(id:number){
    this.officeService.deleteOffice(id);  
  }
}


