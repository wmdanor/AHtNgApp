import { TestBed } from '@angular/core/testing';

import { SignInService } from './sign-in.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SignInService', () => {
  let service: SignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
