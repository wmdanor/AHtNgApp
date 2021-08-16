import { TestBed } from '@angular/core/testing';

import { LibraryResolver } from './library.resolver';

describe('LibraryResolver', () => {
  let resolver: LibraryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LibraryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
