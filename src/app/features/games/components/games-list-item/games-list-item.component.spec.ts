import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListItemComponent } from './games-list-item.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GamesListItemComponent', () => {
  let component: GamesListItemComponent;
  let fixture: ComponentFixture<GamesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesListItemComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListItemComponent);
    component = fixture.componentInstance;
    component.game = {
      id: 1, description: "", name: "", price: 0, tags: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
