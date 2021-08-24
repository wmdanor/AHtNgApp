import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Friend, FriendsPage, FriendStatus} from "@/features/friends/models";
import {Pagination} from "@core/models/pagination";
import {apiBaseUrl} from "@core/constants/api";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "@core/models/user";
import {LoggedUserService} from "@core/services/logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private readonly apiUrl = apiBaseUrl + 'users';
  private user: User | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly state: LoggedUserService,
  ) {
    this.state.getLoggedUser$().subscribe((user) => this.user = user);
  }

  public getFriendshipStatus$(friendId: number): Observable<FriendStatus> {
    const id = this.user?.id;
    return this.http.get(this.apiUrl + `/${id}/friends/${friendId}/status`)
      .pipe(map((res: any) => res.status));
  }

  // Select observable type
  public updateFriendshipStatus$(friend: Friend): Observable<unknown> {
    const id = this.user?.id;
    return this.http.put(this.apiUrl + `/${id}/friends/${friend.user.id}/status`, {status: friend.status});
  }

  // TODO: implement normally
  public getFriends$(pagination: Pagination): Observable<FriendsPage> {
    // return of({
    //   ...pagination,
    //   count: 1,
    //   friends: [
    //     {
    //       user: {
    //         id: 1,
    //         username: 'example1',
    //         email: 'example@mail.com',
    //       },
    //       status: FriendStatus.Friends,
    //     }
    //   ]
    // });
    const id = this.user?.id;
    return this.http.get<FriendsPage>(this.apiUrl + `/${id}/friends`, {params: {...pagination}});
  }

  public getSentRequests$(pagination: Pagination): Observable<FriendsPage> {
    // return of({
    //   ...pagination,
    //   count: 2,
    //   friends: [
    //     {
    //       user: {
    //         id: 1,
    //         username: 'example2',
    //         email: 'example@mail.com',
    //       },
    //       status: FriendStatus.SentRequest,
    //     }
    //   ]
    // });
    const id = this.user?.id;
    return this.http.get<FriendsPage>(this.apiUrl + `/${id}/friends/sent`, {params: {...pagination}});
  }

  public getReceivedRequests$(pagination: Pagination): Observable<FriendsPage> {
    // return of({
    //   ...pagination,
    //   count: 3,
    //   friends: [
    //     {
    //       user: {
    //         id: 1,
    //         username: 'example3',
    //         email: 'example@mail.com',
    //       },
    //       status: FriendStatus.ReceivedRequest,
    //     }
    //   ]
    // });
    const id = this.user?.id;
    return this.http.get<FriendsPage>(this.apiUrl + `/${id}/friends/received`, {params: {...pagination}});
  }

  public findUsers$(pagination: Pagination, query: string): Observable<FriendsPage> {
    // return of({
    //   ...pagination,
    //   count: 4,
    //   friends: [
    //     {
    //       user: {
    //         id: 1,
    //         username: 'example4',
    //         email: 'example@mail.com',
    //       },
    //       status: FriendStatus.None,
    //     }
    //   ]
    // });
    const id = this.user?.id;
    return this.http.get(
      this.apiUrl,
      {params: {...pagination, query}},
      )
      .pipe(map(({limit, offset, count, users}: any) => {
        return {
          limit, offset, count,
          friends: users.map((user: User) => {
            return {user};
          })
        }
    }));
  }
}
