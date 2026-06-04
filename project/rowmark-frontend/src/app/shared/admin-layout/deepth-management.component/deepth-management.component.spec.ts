import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepthManagementComponent } from './deepth-management.component';

describe('DeepthManagementComponent', () => {
  let component: DeepthManagementComponent;
  let fixture: ComponentFixture<DeepthManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepthManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepthManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
