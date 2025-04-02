import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EelsSelectComponent } from './eels-select.component';

describe('OrusSelectComponent', () => {
  let component: EelsSelectComponent;
  let fixture: ComponentFixture<EelsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EelsSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EelsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
