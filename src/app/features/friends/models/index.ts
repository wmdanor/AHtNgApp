import {User} from "@core/models/user";
import {PaginatedResult} from "@core/models/pagination";

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
