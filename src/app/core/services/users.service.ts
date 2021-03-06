import { Injectable } from '@angular/core';
import {User} from "@core/models/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiBaseUrl} from "@core/constants/api";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = apiBaseUrl + 'users';

  constructor(
    private readonly http: HttpClient
  ) { }

  getUser$(id: number): Observable<User | undefined> {
    return this.http.get(this.apiUrl + `/${id}`)
      .pipe(map((res: any) => res.user));
  }

  updateUser$(user: User): Observable<boolean> {
    return this.http.put(this.apiUrl + `/${user.id}`, {...user})
      .pipe(map((res: any) => res.user));
  }
}
