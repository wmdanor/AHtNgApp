import { TestBed } from '@angular/core/testing';

import { LoggedUserService } from './logged-user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoggedUserService', () => {
  let service: LoggedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoggedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
