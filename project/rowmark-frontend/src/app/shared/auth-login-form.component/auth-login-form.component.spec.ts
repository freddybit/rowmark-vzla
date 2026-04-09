import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginFormComponent } from './auth-login-form.component';

describe('AuthLoginFormComponent', () => {
  let component: AuthLoginFormComponent;
  let fixture: ComponentFixture<AuthLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLoginFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
