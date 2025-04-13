/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindersListComponent } from './finders-list.component';

describe('FindersListComponent', () => {
  let component: FindersListComponent;
  let fixture: ComponentFixture<FindersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
