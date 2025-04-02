import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EelsProgressBarComponent } from './eels-progress-bar.component';

describe('EelsProgressBarComponent', () => {
  let component: EelsProgressBarComponent;
  let fixture: ComponentFixture<EelsProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EelsProgressBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EelsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
