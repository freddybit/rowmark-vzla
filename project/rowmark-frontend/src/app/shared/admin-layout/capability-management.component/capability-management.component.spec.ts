import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityManagementComponent } from './capability-management.component';

describe('CapabilityManagementComponent', () => {
  let component: CapabilityManagementComponent;
  let fixture: ComponentFixture<CapabilityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapabilityManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapabilityManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
