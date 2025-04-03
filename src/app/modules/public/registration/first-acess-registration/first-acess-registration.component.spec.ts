import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAcessRegistrationComponent } from './first-acess-registration.component';

describe('FirstAcessRegistrationComponent', () => {
  let component: FirstAcessRegistrationComponent;
  let fixture: ComponentFixture<FirstAcessRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAcessRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstAcessRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
