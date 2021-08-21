import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@core/models/user";
import {apiBaseUrl} from "@core/constants/api";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  private readonly apiUrl = apiBaseUrl + 'users/'

  private user: User | undefined;

  constructor(
    private readonly http: HttpClient
  ) {
    this.updateLoggedUser();
  }

  public get loggedUser(): User | undefined {
    return this.user;
  }

  public updateLoggedUser() {
    this.http.get(this.apiUrl + 'me').subscribe((res: any) => {
      this.user = res.user;
    });
  }
}
