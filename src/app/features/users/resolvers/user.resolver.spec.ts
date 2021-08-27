import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(UserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
