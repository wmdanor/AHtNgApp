import { TestBed } from '@angular/core/testing';

import { LibraryResolver } from './library.resolver';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LibraryResolver', () => {
  let resolver: LibraryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(LibraryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
