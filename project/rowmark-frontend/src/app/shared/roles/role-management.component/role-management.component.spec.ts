import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementComponent } from './role-management.component';

describe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
