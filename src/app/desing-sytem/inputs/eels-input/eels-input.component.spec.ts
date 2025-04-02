/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EelsInputComponent } from './eels-input.component';

describe('OrusInputComponent', () => {
  let component: EelsInputComponent;
  let fixture: ComponentFixture<EelsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EelsInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EelsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
