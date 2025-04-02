import { TestBed } from '@angular/core/testing';

import { userInterceptor } from './user.interceptor';

describe('userInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      userInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: userInterceptor = TestBed.inject(userInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
