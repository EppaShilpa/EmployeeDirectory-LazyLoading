import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTitlesRoutingModule } from './job-titles-routing.module';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobTitlesComponent,
    
  ],
  imports: [
    CommonModule,
    JobTitlesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class JobTitlesModule { }
