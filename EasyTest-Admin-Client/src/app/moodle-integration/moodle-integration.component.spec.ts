import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleIntegrationComponent } from './moodle-integration.component';

describe('MoodleIntegrationComponent', () => {
  let component: MoodleIntegrationComponent;
  let fixture: ComponentFixture<MoodleIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodleIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
