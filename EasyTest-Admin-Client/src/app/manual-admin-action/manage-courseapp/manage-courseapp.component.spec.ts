import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCourseappComponent } from './manage-courseapp.component';

describe('ManageCourseappComponent', () => {
  let component: ManageCourseappComponent;
  let fixture: ComponentFixture<ManageCourseappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCourseappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCourseappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
