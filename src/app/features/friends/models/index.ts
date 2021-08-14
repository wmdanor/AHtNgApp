import {User} from "@core/models/user";

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
