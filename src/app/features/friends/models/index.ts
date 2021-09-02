import {User} from "@core/models/user";
import {PaginatedResult, Pagination} from "@core/models/pagination";
import {Observable} from "rxjs";

export enum FriendStatus {
  Friends = 'FRIENDS',
  SentRequest = 'SENT_REQUEST',
  ReceivedRequest = 'RECEIVED_REQUEST',
  None = 'NONE'
}

export interface Friend {
  user: User;
  status?: FriendStatus;
}

export interface FriendsPage extends PaginatedResult {
  friends: Friend[];
}

export interface FriendsPageResponse extends PaginatedResult {
  users: User[];
}

export type UsersGetter = ((pagination: Pagination) => Observable<FriendsPage>) |
  ((pagination: Pagination, query: string) => Observable<FriendsPage>);
