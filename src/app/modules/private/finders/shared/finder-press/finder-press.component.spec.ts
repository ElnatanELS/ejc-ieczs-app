/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinderPressComponent } from './finder-press.component';

describe('FinderPressComponent', () => {
  let component: FinderPressComponent;
  let fixture: ComponentFixture<FinderPressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderPressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
