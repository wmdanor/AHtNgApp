import {User} from "@core/models/user";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}
