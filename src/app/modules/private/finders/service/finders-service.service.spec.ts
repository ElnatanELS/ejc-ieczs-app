/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FindersServiceService } from './finders-service.service';

describe('Service: FindersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindersServiceService]
    });
  });

  it('should ...', inject([FindersServiceService], (service: FindersServiceService) => {
    expect(service).toBeTruthy();
  }));
});
