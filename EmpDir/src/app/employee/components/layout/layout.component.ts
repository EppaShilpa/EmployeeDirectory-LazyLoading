import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {
  shouldAddClass: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (this.shouldAddClass) {
        this.shouldAddClass = false;
      }
    });
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === "/employees/add"||event.url.includes("/employees/edit")||event.url.includes("/employees/employee")) {
        this.shouldAddClass = true;
      } 

    });
  }

}
