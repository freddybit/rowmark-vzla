import { TestBed } from '@angular/core/testing';

import { DolarApi } from './dolar-api';

describe('DolarApi', () => {
  let service: DolarApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolarApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
