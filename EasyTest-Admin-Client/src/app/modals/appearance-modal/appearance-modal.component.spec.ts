import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceModalComponent } from './appearance-modal.component';

describe('AppearanceModalComponent', () => {
  let component: AppearanceModalComponent;
  let fixture: ComponentFixture<AppearanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppearanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
