import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbNavChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {Friend, FriendStatus} from "@/features/friends/models";
import {Observable, Subscription} from "rxjs";
import {FriendsService} from "@/features/friends/services/friends.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';

  public activeId: number = 0;
  public page = 1;
  public friends: Friend[] = [];
  public friends$: Observable<Friend[]> = new Observable<Friend[]>();
  private lastSubscription: Subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly friendsService: FriendsService
  ) { }

  ngOnInit(): void {
    this.activeId = 1;
    this.getFriends(); // TODO: fetch users
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchQuery.currentValue) {
      this.activeId = 4;
    } else {
      this.activeId = 1;
    }
    this.resetPagination(this.activeId);
  }

  changeFriendStatus(friend: Friend) {
    const index = this.friends.findIndex((el) => friend.user.id === el.user.id);
    if (this.activeId === 4) {
      this.friends[index] = friend;
    } else {
      this.friends.splice(index, 1);
    }
  }

  tabChanged(event: NgbNavChangeEvent) {
    this.resetPagination(event.nextId);
  }

  resetPagination(activeId: number) {
    this.lastSubscription.unsubscribe();
    this.friends = [];
    this.page = 1;
    switch (activeId) {
      case 1:
        this.getFriends();
        break;
      case 2:
        this.getSentRequests();
        break;
      case 3:
        this.getReceivedRequests();
        break;
      case 4:
        this.getSearchedUsers();
        break;
    }
  }

  getFriends() {
    this.lastSubscription = this.friendsService.getFriends$()
      .subscribe((friends => this.friends = friends));
  }

  getSentRequests() {
    this.lastSubscription = this.friendsService.getSentRequests$()
      .subscribe((friends => this.friends = friends));
  }

  getReceivedRequests() {
    this.lastSubscription = this.friendsService.getReceivedRequests$()
      .subscribe((friends => this.friends = friends));
  }

  getSearchedUsers() {
    this.lastSubscription = this.friendsService.findUsers$(this.searchQuery)
      .subscribe((friends => this.friends = friends));
  }
}
