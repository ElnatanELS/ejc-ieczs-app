import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EelsRadioComponent } from './eels-radio.component';

describe('OrusRadioComponent', () => {
  let component: EelsRadioComponent;
  let fixture: ComponentFixture<EelsRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EelsRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EelsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
