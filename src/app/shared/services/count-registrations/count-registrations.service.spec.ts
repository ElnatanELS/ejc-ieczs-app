/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountRegistrationsService } from './count-registrations.service';

describe('Service: CountRegistrations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountRegistrationsService]
    });
  });

  it('should ...', inject([CountRegistrationsService], (service: CountRegistrationsService) => {
    expect(service).toBeTruthy();
  }));
});
