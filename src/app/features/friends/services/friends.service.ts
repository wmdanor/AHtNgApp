import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FriendsPage, FriendsPageResponse, FriendStatus} from "@/features/friends/models";
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

  public updateFriendshipStatus$(friendId: number, status: FriendStatus): Observable<unknown> {
    const id = this.user?.id;
    return this.http.post(this.apiUrl + `/${id}/friends/${friendId}/status`, {status})
      .pipe(map((res: any) => res.status));
  }

  public getFriends$(pagination: Pagination): Observable<FriendsPage> {
    const id = this.user?.id;
    return this.http.get<FriendsPageResponse>(
      this.apiUrl + `/${id}/friends`,
      {params: {...pagination}}
    )
      .pipe(map(FriendsService.mapFriendsPage));
  }

  public getSentRequests$(pagination: Pagination): Observable<FriendsPage> {
    const id = this.user?.id;
    return this.http.get<FriendsPageResponse>(
      this.apiUrl + `/${id}/friends/sent`,
      {params: {...pagination}}
    )
      .pipe(map(FriendsService.mapFriendsPage));
  }

  public getReceivedRequests$(pagination: Pagination): Observable<FriendsPage> {
    const id = this.user?.id;
    return this.http.get<FriendsPageResponse>(
      this.apiUrl + `/${id}/friends/received`,
      {params: {...pagination}}
    )
      .pipe(map(FriendsService.mapFriendsPage));
  }

  public findUsers$(pagination: Pagination, query: string): Observable<FriendsPage> {
    return this.http.get<FriendsPageResponse>(
      this.apiUrl,
      {params: {...pagination, query}},
      )
      .pipe(map(FriendsService.mapFriendsPage));
  }

  private static mapFriendsPage({limit, offset, count, users}: FriendsPageResponse) : FriendsPage {
    return {
      limit, offset, count,
      friends: users.map((user: User) => {
        return {user};
      })
    }
  }
}
