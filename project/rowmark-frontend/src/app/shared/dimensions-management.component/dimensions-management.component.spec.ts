import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsManagementComponent } from './dimensions-management.component';

describe('DimensionsManagementComponent', () => {
  let component: DimensionsManagementComponent;
  let fixture: ComponentFixture<DimensionsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimensionsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionsManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
