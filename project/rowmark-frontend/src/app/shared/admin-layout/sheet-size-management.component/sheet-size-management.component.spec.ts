import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSizeManagementComponent } from './sheet-size-management.component';

describe('SheetSizeManagementComponent', () => {
  let component: SheetSizeManagementComponent;
  let fixture: ComponentFixture<SheetSizeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetSizeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetSizeManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
