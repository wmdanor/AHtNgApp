import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbNavChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {Friend, FriendsPage, UsersGetter} from "@/features/friends/models";
import {Subscription} from "rxjs";
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
  public pageSize = 10;
  public pageData: FriendsPage = {offset: 0, limit: 0, count: 0, friends: []};
  private lastSubscription: Subscription = new Subscription();

  private currentUsersGetter: UsersGetter;

  private readonly getFriends$: UsersGetter;
  private readonly getSentRequests$: UsersGetter;
  private readonly getReceivedRequests$: UsersGetter;
  private readonly findUsers$: UsersGetter;

  constructor(
    private readonly friendsService: FriendsService
  ) {
    this.getFriends$ = this.friendsService.getFriends$.bind(this.friendsService);
    this.getSentRequests$ = this.friendsService.getSentRequests$.bind(this.friendsService);
    this.getReceivedRequests$ = this.friendsService.getReceivedRequests$.bind(this.friendsService);
    this.findUsers$ = this.friendsService.findUsers$.bind(this.friendsService);

    this.currentUsersGetter = this.getFriends$;
  }

  ngOnInit(): void {
    this.activeId = 1;
    this.reloadList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchQuery.currentValue) {
      this.activeId = 4;
    } else {
      this.activeId = 1;
    }
    this.resetPagination(this.activeId);
  }

  friendStatusChange(friend: Friend) {
    const index = this.pageData.friends.findIndex((el) => friend.user.id === el.user.id);
    this.pageData.friends[index] = friend;
  }

  tabChanged(event: NgbNavChangeEvent) {
    this.resetPagination(event.nextId);
  }

  resetPagination(activeId: number) {
    this.pageData = {offset: 0, limit: 0, count: 0, friends: []};
    this.page = 1;
    switch (activeId) {
      case 1:
        this.currentUsersGetter = this.getFriends$;
        break;
      case 2:
        this.currentUsersGetter = this.getSentRequests$;
        break;
      case 3:
        this.currentUsersGetter = this.getReceivedRequests$;
        break;
      case 4:
        this.currentUsersGetter = this.findUsers$;
        break;
    }
    this.reloadList();
  }

  reloadList() {
    this.lastSubscription.unsubscribe();
    this.lastSubscription = this.currentUsersGetter({
      offset: this.offset,
      limit: this.pageSize
    }, this.searchQuery)
      .subscribe((friendsPage) => {
        this.pageData = friendsPage;
      });
  }

  private get offset() {
    return (this.page-1)*this.pageSize;
  }
}
