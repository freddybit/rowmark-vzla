import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookStockPage } from './look-stock.page';

describe('LookStockPage', () => {
  let component: LookStockPage;
  let fixture: ComponentFixture<LookStockPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookStockPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookStockPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
