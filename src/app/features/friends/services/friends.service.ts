import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Friend, FriendStatus} from "@/features/friends/models";

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
  public getFriends$(): Observable<Friend[]> {
    return of([
      {
        user: {
          id: 1,
          username: 'example1',
          email: 'example@mail.com',
        },
        status: FriendStatus.Friends,
      }
    ]);
  }

  public getSentRequests$(): Observable<Friend[]> {
    return of([
      {
        user: {
          id: 2,
          username: 'example2',
          email: 'example@mail.com',
        },
        status: FriendStatus.SentRequest,
      }
    ]);
  }

  public getReceivedRequests$(): Observable<Friend[]> {
    return of([
      {
        user: {
          id: 3,
          username: 'example3',
          email: 'example@mail.com',
        },
        status: FriendStatus.ReceivedRequest,
      }
    ]);
  }

  public findUsers$(query: string): Observable<Friend[]> {
    return of([
      {
        user: {
          id: 4,
          username: 'example4',
          email: 'example@mail.com',
        },
        status: FriendStatus.None,
      }
    ]);
  }
}
