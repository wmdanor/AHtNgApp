import { TestBed } from '@angular/core/testing';

import { GameResolver } from './game.resolver';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GameResolver', () => {
  let resolver: GameResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(GameResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
