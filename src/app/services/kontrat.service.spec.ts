import { TestBed } from '@angular/core/testing';

import { KontratService } from './kontrat.service';

describe('KontratService', () => {
  let service: KontratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KontratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
