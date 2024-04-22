import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsheetViewComponent } from './bottomsheet-view.component';

describe('BottomsheetViewComponent', () => {
  let component: BottomsheetViewComponent;
  let fixture: ComponentFixture<BottomsheetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomsheetViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomsheetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
