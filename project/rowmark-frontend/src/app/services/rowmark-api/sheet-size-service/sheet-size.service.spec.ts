import { TestBed } from '@angular/core/testing';

import { SheetSizeService } from './sheet-size.service';

describe('SheetSizeService', () => {
  let service: SheetSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
