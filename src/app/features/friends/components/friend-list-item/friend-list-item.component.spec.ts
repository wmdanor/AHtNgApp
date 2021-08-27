import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListItemComponent } from './friend-list-item.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FriendListItemComponent', () => {
  let component: FriendListItemComponent;
  let fixture: ComponentFixture<FriendListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListItemComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListItemComponent);
    component = fixture.componentInstance;
    component.friend = {
      user: {
        id: 1, username: '', email: '', age: 14,
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
