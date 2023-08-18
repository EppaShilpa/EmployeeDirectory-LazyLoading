import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficesComponent } from './components/offices/offices.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OfficesComponent
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class OfficesModule { }
