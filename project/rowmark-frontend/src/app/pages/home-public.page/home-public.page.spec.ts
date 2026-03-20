import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicPage } from './home-public.page';

describe('HomePublicPage', () => {
  let component: HomePublicPage;
  let fixture: ComponentFixture<HomePublicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePublicPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePublicPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
