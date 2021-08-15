import {User} from "@core/models/user";
import {PaginatedResult} from "@core/models/pagination";

export enum FriendStatus {
  Friends,
  SentRequest,
  ReceivedRequest,
  None
}

export interface Friend {
  user: User;
  status: FriendStatus;
}

export interface FriendsPage extends PaginatedResult {
  friends: Friend[];
}
