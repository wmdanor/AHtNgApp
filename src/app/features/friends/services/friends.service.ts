import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Friend, FriendsPage, FriendStatus} from "@/features/friends/models";
import {Pagination} from "@core/models/pagination";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor() { }

  // Select observable type
  public updateFriendshipStatus$(friend: Friend): Observable<unknown> {
    const loggedUser = null;

    // http service call ...

    return of(true);
  }

  // TODO: implement normally
  public getFriends$(pagination: Pagination): Observable<FriendsPage> {
    return of({
      ...pagination,
      count: 1,
      friends: [
        {
          user: {
            id: 1,
            username: 'example1',
            email: 'example@mail.com',
          },
          status: FriendStatus.Friends,
        }
      ]
    });
  }

  public getSentRequests$(pagination: Pagination): Observable<FriendsPage> {
    return of({
      ...pagination,
      count: 2,
      friends: [
        {
          user: {
            id: 1,
            username: 'example2',
            email: 'example@mail.com',
          },
          status: FriendStatus.SentRequest,
        }
      ]
    });
  }

  public getReceivedRequests$(pagination: Pagination): Observable<FriendsPage> {
    return of({
      ...pagination,
      count: 3,
      friends: [
        {
          user: {
            id: 1,
            username: 'example3',
            email: 'example@mail.com',
          },
          status: FriendStatus.ReceivedRequest,
        }
      ]
    });
  }

  public findUsers$(pagination: Pagination, query: string): Observable<FriendsPage> {
    return of({
      ...pagination,
      count: 4,
      friends: [
        {
          user: {
            id: 1,
            username: 'example4',
            email: 'example@mail.com',
          },
          status: FriendStatus.None,
        }
      ]
    });
  }
}
