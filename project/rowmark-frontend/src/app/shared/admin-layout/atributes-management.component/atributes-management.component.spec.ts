import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributesManagementComponent } from './atributes-management.component';

describe('AtributesManagementComponent', () => {
  let component: AtributesManagementComponent;
  let fixture: ComponentFixture<AtributesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtributesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtributesManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
