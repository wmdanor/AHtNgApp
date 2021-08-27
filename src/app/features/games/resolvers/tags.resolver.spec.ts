import { TestBed } from '@angular/core/testing';

import { TagsResolver } from './tags.resolver';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TagsResolver', () => {
  let resolver: TagsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(TagsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
