import { TestBed } from '@angular/core/testing';

import { PressenceService } from './pressence.service';

describe('PressenceService', () => {
  let service: PressenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PressenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
