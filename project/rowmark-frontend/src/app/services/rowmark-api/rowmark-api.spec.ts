import { TestBed } from '@angular/core/testing';

import { RowmarkApi } from './rowmark-api';

describe('RowmarkApi', () => {
  let service: RowmarkApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowmarkApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
