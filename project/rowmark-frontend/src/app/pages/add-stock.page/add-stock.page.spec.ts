import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockPage } from './add-stock.page';

describe('AddStockPage', () => {
  let component: AddStockPage;
  let fixture: ComponentFixture<AddStockPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStockPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStockPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
