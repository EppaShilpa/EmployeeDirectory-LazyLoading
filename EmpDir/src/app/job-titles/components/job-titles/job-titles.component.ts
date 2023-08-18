import { Component } from '@angular/core';
import { IEmployee } from 'src/app/shared/Models/iemployee';
import { EmployeeDataService } from 'src/app/shared/services/employee-data.service';
import { JobTitleService } from 'src/app/shared/services/job-title.service';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.scss']
})
export class JobTitlesComponent {
  
  jobTitles!: any ;
  jobTitle!: string;

  constructor(private jobTitleService: JobTitleService) {
  this.jobTitles=[]
  }
 ngOnInit():void{
   this.subscribeData()
 }
  subscribeData():void{
    this.jobTitleService.jobTitles.subscribe(data=>{
      this.jobTitles = data;
    })
  }
  postJobTitle(): void {
    if (this.jobTitle.length > 0) {
      this.jobTitleService.PostJobTitle(this.jobTitle)
      this.jobTitle = ''
    }
  }
  deleteJobTitle(id: number): void {
    this.jobTitleService.deleteJobTitle(id)
  }
}
