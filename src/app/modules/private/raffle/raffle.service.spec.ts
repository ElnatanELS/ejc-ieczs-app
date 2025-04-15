/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RaffleService } from './raffle.service';

describe('Service: Raffle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaffleService]
    });
  });

  it('should ...', inject([RaffleService], (service: RaffleService) => {
    expect(service).toBeTruthy();
  }));
});
