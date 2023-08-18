import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { SidebarComponent } from './components/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FiltersRoutingModule,
     SharedModule
  ],
  exports:[SidebarComponent]
})
export class FiltersModule { }
