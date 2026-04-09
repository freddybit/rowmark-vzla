import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPrivatePage } from './auth-private.page';

describe('AuthPrivatePage', () => {
  let component: AuthPrivatePage;
  let fixture: ComponentFixture<AuthPrivatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPrivatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPrivatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
