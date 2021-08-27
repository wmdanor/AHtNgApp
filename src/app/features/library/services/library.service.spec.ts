import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
