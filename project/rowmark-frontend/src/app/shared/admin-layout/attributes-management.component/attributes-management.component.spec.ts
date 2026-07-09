import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesManagementComponent } from './attributes-management.component';

describe('AttributesManagementComponent', () => {
  let component: AttributesManagementComponent;
  let fixture: ComponentFixture<AttributesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
