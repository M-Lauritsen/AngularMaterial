import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalReceiverComponent } from './signal-receiver.component';

describe('SignalReceiverComponent', () => {
  let component: SignalReceiverComponent;
  let fixture: ComponentFixture<SignalReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalReceiverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
