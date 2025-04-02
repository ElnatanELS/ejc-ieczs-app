import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAcessComponent } from './first-acess.component';

describe('FirstAcessComponent', () => {
  let component: FirstAcessComponent;
  let fixture: ComponentFixture<FirstAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
