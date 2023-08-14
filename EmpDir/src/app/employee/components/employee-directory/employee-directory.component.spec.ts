import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedirectoryComponent } from './employee-directory.component';

describe('EmployeedirectoryComponent', () => {
  let component: EmployeedirectoryComponent;
  let fixture: ComponentFixture<EmployeedirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeedirectoryComponent]
    });
    fixture = TestBed.createComponent(EmployeedirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
