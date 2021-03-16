import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAdminActionComponent } from './manual-admin-action.component';

describe('ManualAdminActionComponent', () => {
  let component: ManualAdminActionComponent;
  let fixture: ComponentFixture<ManualAdminActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAdminActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAdminActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
