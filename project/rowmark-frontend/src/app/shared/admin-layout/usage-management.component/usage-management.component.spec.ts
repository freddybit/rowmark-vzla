import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageManagementComponent } from './usage-management.component';

describe('UsageManagementComponent', () => {
  let component: UsageManagementComponent;
  let fixture: ComponentFixture<UsageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
