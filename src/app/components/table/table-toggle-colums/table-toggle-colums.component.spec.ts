import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToggleColumsComponent } from './table-toggle-colums.component';

describe('TableToggleColumsComponent', () => {
  let component: TableToggleColumsComponent;
  let fixture: ComponentFixture<TableToggleColumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableToggleColumsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableToggleColumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
