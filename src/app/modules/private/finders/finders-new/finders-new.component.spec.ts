/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindersNewComponent } from './finders-new.component';

describe('FindersNewComponent', () => {
  let component: FindersNewComponent;
  let fixture: ComponentFixture<FindersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
