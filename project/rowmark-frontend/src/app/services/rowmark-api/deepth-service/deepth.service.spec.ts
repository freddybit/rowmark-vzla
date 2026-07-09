import { TestBed } from '@angular/core/testing';

import { DeepthService } from './deepth.service';

describe('DeepthService', () => {
  let service: DeepthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
