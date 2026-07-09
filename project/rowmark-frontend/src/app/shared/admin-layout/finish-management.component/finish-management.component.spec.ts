import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishManagementComponent } from './finish-management.component';

describe('FinishManagementComponent', () => {
  let component: FinishManagementComponent;
  let fixture: ComponentFixture<FinishManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
