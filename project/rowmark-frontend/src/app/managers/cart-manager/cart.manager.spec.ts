import { TestBed } from '@angular/core/testing';

import { CartManager } from './cart.manager';

describe('CartManager', () => {
  let service: CartManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
