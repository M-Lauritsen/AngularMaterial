import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceTrackerComponent } from './presence-tracker.component';

describe('PresenceTrackerComponent', () => {
  let component: PresenceTrackerComponent;
  let fixture: ComponentFixture<PresenceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenceTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresenceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
