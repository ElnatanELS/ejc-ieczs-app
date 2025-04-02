import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewMemberComponent } from './new-member.component';

describe('NewMemberComponent', () => {
  let component: NewMemberComponent;
  let fixture: ComponentFixture<NewMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewMemberComponent]
    });
    fixture = TestBed.createComponent(NewMemberComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
