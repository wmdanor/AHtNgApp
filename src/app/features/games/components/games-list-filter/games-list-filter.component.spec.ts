import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListFilterComponent } from './games-list-filter.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('GamesListFilterComponent', () => {
  let component: GamesListFilterComponent;
  let fixture: ComponentFixture<GamesListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesListFilterComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
