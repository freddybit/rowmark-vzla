import { TestBed } from '@angular/core/testing';

import { PlaceInterface } from './place.interface';

describe('PlaceInterface', () => {
  let service: PlaceInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceInterface);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
